const express = require('express');
const router = express.Router();
const newsDetailModel = require('../models/newsDetail_model'); // Import model

// API: Lấy chi tiết bài báo theo MaBaiBlog
router.get('/:MaBaiBlog', async (req, res) => {
    const MaBaiPost = req.params.MaBaiBlog; // Lấy MaBaiPost từ tham số URL

    try {
        const article = await newsDetailModel.getArticleById(MaBaiPost); // Lấy bài viết từ cơ sở dữ liệu

        // Kiểm tra nếu bài viết tồn tại
        if (article) {
            res.render('news-detail', { article: article }); // Render trang news-detail.ejs và truyền dữ liệu bài viết
        } else {
            res.status(404).json({
                success: false,
                message: 'Bài báo không tồn tại' // Nếu không tìm thấy bài viết
            });
        }
    } catch (err) {
        console.error('Lỗi khi lấy bài báo theo ID:', err.message);
        res.status(500).json({
            success: false,
            message: 'Lỗi server' // Nếu có lỗi server xảy ra
        });
    }
});



module.exports = router;