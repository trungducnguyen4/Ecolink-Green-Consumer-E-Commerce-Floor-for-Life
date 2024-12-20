const productModel = require('../models/product_model');
const { poolPromise, sql } = require('../db');
const multer = require('multer');
const path = require('path');


async function getProductsPage(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 18;  // Mỗi trang có 18 sản phẩm

        // Lấy danh sách categories từ query string (nếu có)
        const categories = req.query.categories ? req.query.categories.split(',') : [];

        let products, totalProducts;

        if (categories.length > 0) {
            // Nếu có categories, lấy sản phẩm lọc theo danh mục
            const categoryFilter = categories.map(cat => `'${cat}'`).join(',');

            // Lấy tổng số sản phẩm và sản phẩm theo bộ lọc
            totalProducts = await productModel.getTotalFilteredProducts(categoryFilter);
            products = await productModel.getFilteredProducts(categoryFilter, page, pageSize);
        } else {
            // Nếu không có categories, lấy tất cả sản phẩm
            totalProductsResult = await productModel.getTotalProducts();
            totalProducts = totalProductsResult[0].TotalProducts;
            products = await productModel.getProducts(page, pageSize);
        }

        // Tính số trang
        const totalPages = Math.ceil(totalProducts / pageSize);

        // Truyền dữ liệu vào view
        res.render('products', {
            products,
            page,
            totalPages,
            categories  // Truyền categories đã chọn cho view
        });
    } catch (err) {
        console.error('Error in getProductsPage:', err);
        res.status(500).send('Internal Server Error');
    }
}




async function searchProducts(req, res) {
    try {
        const keyword = req.query.keyword || '';

        if (!keyword) {
            return res.status(400).send('Keyword is required');
        }

        console.log('Searching for products with keyword:', keyword);

        //cho biến categories là mảng rỗng
        const categories = [];

        // Tìm kiếm sản phẩm từ cơ sở dữ liệu
        const products = await productModel.searchProducts(keyword);

        // Lấy tổng số sản phẩm tìm được từ cơ sở dữ liệu
        const totalProducts = 20;

        // Tính toán số trang
        const totalPages = Math.ceil(totalProducts / 18);

        // Xử lý phân trang
        const page = parseInt(req.query.page) || 1;
        const start = (page - 1) * 18;
        const end = page * 18;
        const paginatedProducts = products.slice(start, end);

        // Nếu không có sản phẩm tìm thấy, trả về thông báo
        if (paginatedProducts.length === 0) {
            return res.render('products', {
                products: [],
                keyword,
                message: 'Không có sản phẩm nào phù hợp với từ khóa tìm kiếm của bạn.',
                page,
                totalPages,
                categories
            });
        }

        // Trả về view với dữ liệu tìm kiếm
        res.render('products', {
            products: paginatedProducts,
            keyword,
            page,
            totalPages,
            categories
        });
    } catch (err) {
        console.error('Error in searchProducts:', err);
        res.status(500).send('Internal Server Error');
    }
}







async function getProductDetail(req, res) {
    const MaSP = req.params.id.trim(); // Lấy mã sản phẩm từ URL và loại bỏ khoảng trắng

    if (!MaSP) {
        return res.status(400).render('error', { message: 'Mã sản phẩm không hợp lệ.' });
    }

    try {
        const pool = await poolPromise;

        // Truy vấn thông tin sản phẩm
        const productResult = await pool.request()
            .input('MaSP', sql.NChar(20), MaSP)
            .query(`
                SELECT *
                FROM SanPham
                WHERE MaSP = @MaSP
            `);

        if (productResult.recordset.length === 0) {
            return res.status(404).render('error', { message: 'Sản phẩm không tồn tại.' });
        }

        const product = productResult.recordset[0];

        // Lấy thông tin đánh giá
        const reviewsResult = await pool.request()
            .input('MaSP', sql.NChar(20), MaSP)
            .query(`
                SELECT 
                    dg.DiemDanhGia, 
                    dg.NDDanhGia, 
                    dg.NgayDanhGia, 
                    nd.TenDangNhap, 
                    nd.HoUser, 
                    nd.TenUser
                FROM DanhGiaSanPham dg
                JOIN NguoiDung nd ON dg.MaUser = nd.MaUser
                WHERE dg.MaSP = @MaSP
                ORDER BY dg.NgayDanhGia DESC
            `);

        const reviews = reviewsResult.recordset;

         // Truy vấn đặc điểm xanh của sản phẩm
         const certificatesResult = await pool.request()
         .input('MaSP', sql.NVarChar, MaSP)
         .query(`
             SELECT D.TenDDX, C.HinhDDX, C.CoQuanCap
             FROM CT_DDX C
             JOIN SanPham SP ON C.MaNguoiBan = SP.MaNguoiBan JOIN DacDiemXanh D ON D.MaDDX=C.MaDDX
             Where SP.MaSP = @MaSP
         `);

     const certificates = certificatesResult.recordset;

        // Truy vấn đánh giá trung bình
        const ratingResult = await pool.request()
            .input('MaSP', sql.NChar(20), MaSP)
            .query(`
                SELECT AVG(DiemDanhGia) AS AverageRating, COUNT(*) AS RatingCount
                FROM DanhGiaSanPham
                WHERE MaSP = @MaSP
            `);

        const averageRating = ratingResult.recordset[0].AverageRating;
        const ratingCount = ratingResult.recordset[0].RatingCount;

        // Gửi dữ liệu đến view
        res.render('product-detail', { product,reviews, certificates, averageRating, ratingCount });
    } catch (err) {
        console.error('Error in getProductDetail:', err);
        res.status(500).render('error', { message: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm.' });
    }
}




// Cấu hình multer để lưu hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/product_image'); // Thư mục lưu hình ảnh
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Xử lý form thêm sản phẩm
async function addProduct(req, res) {
    try {
        const pool = await poolPromise;

        // Lấy dữ liệu từ form
        const { TenSP, MaNhomSP, SoLuongTon, DGBanMacDinh, MoTa } = req.body;
        const HinhChinh = req.file ? req.file.filename : null;

        // Lấy mã người bán từ session
        const MaNguoiBan = req.session.businessUser.id;

        // Kiểm tra hình ảnh
        if (!HinhChinh) {
            return res.status(400).render('error', { message: 'Hình ảnh sản phẩm là bắt buộc.' });
        }

        // Tạo mã sản phẩm tự động
        const productCountResult = await pool.request()
            .query('SELECT COUNT(*) AS Total FROM SanPham');
        const productCount = productCountResult.recordset[0].Total;
        const MaSP = `SP${productCount + 1}`;

        // Thêm sản phẩm vào database
        await pool.request()
            .input('MaSP', sql.NChar(20), MaSP)
            .input('TenSP', sql.NVarChar(200), TenSP)
            .input('MaNguoiBan', sql.NChar(20), MaNguoiBan)
            .input('MaNhomSP', sql.NChar(20), MaNhomSP)
            .input('SoLuongTon', sql.Int, SoLuongTon)
            .input('DGBanMacDinh', sql.Decimal(10, 2), DGBanMacDinh)
            .input('MoTa', sql.NVarChar(sql.MAX), MoTa)
            .input('HinhChinh', sql.NVarChar(100), HinhChinh)
            .query(`
                INSERT INTO SanPham (MaSP, TenSP, MaNguoiBan, MaNhomSP, SoLuongTon, DGBanMacDinh, MoTa, HinhChinh)
                VALUES (@MaSP, @TenSP, @MaNguoiBan, @MaNhomSP, @SoLuongTon, @DGBanMacDinh, @MoTa, @HinhChinh)
            `);

        // Redirect kèm query string thành công
        res.redirect('/add-product?success=true');
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).render('error', { message: 'Lỗi khi thêm sản phẩm.' });
    }
}

async function loadSellerProducts(req, res) {
    if (!req.session.businessUser) {
        return res.status(401).send('User not logged in');
    }

    let sellerId = req.session.businessUser.id.toString();
    sellerId = sellerId.padEnd(20, ' ');

    try {
        const pool = await poolPromise;

        // Fetch products for the seller
        const productsResult = await pool.request()
            .input('MaNguoiBan', sql.NChar, sellerId)
            .query(`
                SELECT MaSP, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa
                FROM SanPham
                WHERE MaNguoiBan = @MaNguoiBan
                ORDER BY TenSP
            `);

        const products = productsResult.recordset;

        res.render('seller_products', { title: 'Seller Products', products, seller: req.session.businessUser });
    } catch (err) {
        console.error('Error loading seller products:', err);
        res.status(500).send('Error loading seller products');
    }
}

async function getSellerProducts(req, res) {
    if (!req.session.businessUser) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    let sellerId = req.session.businessUser.id.toString();
    sellerId = sellerId.padEnd(20, ' ');

    try {
        const pool = await poolPromise;

        // Fetch products for the seller
        const productsResult = await pool.request()
            .input('MaNguoiBan', sql.NChar, sellerId)
            .query(`
                SELECT MaSP, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa
                FROM SanPham
                WHERE MaNguoiBan = @MaNguoiBan
                ORDER BY TenSP
            `);

        const products = productsResult.recordset;

        res.json({ success: true, products });
    } catch (err) {
        console.error('Error fetching seller products:', err);
        res.status(500).json({ success: false, message: 'Error fetching seller products' });
    }
}

module.exports = {getProductsPage, searchProducts, getProductDetail, addProduct, upload, loadSellerProducts, getSellerProducts};