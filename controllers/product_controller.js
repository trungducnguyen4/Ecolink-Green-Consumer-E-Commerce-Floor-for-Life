const productModel = require('../models/product_model');
const { poolPromise, sql } = require('../db');


async function getProductsPage(req, res) {
    try {
        // Lấy tham số page từ query string, mặc định là trang 1
        const page = parseInt(req.query.page) || 1;
        const pageSize = 18; // Mỗi trang có 18 sản phẩm

        // Lấy số lượng sản phẩm tổng cộng
        const totalProductsResult = await productModel.getTotalProducts();
        const totalProducts = totalProductsResult[0].TotalProducts;

        // Tính số trang
        const totalPages = Math.ceil(totalProducts / pageSize);

        // Lấy sản phẩm cho trang hiện tại
        const products = await productModel.getProducts(page, pageSize);

        // Truyền dữ liệu vào view
        res.render('products', {
            products,
            page,
            totalPages  // Đảm bảo bạn truyền đúng biến này vào view
        });
    } catch (err) {
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
                totalPages
            });
        }

        // Trả về view với dữ liệu tìm kiếm
        res.render('products', {
            products: paginatedProducts,
            keyword,
            page,
            totalPages
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
        res.render('product-detail', { product, averageRating, ratingCount });
    } catch (err) {
        console.error('Error in getProductDetail:', err);
        res.status(500).render('error', { message: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm.' });
    }
}





module.exports = {getProductsPage,searchProducts,getProductDetail};