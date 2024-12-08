const productModel = require('../models/product_model');

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



module.exports = { getProductsPage };
