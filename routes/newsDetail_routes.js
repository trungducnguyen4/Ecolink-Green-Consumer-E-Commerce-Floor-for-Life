const express = require('express');
const router = express.Router();
const newsDetailModel = require('../models/newsDetail_model'); // Import model

router.get('/:MaBaiBlog', async (req, res) => {
    const MaBaiPost = req.params.MaBaiBlog;

    // Kiểm tra nếu MaBaiPost không hợp lệ
    if (!MaBaiPost || isNaN(MaBaiPost)) {
        return res.status(400).json({
            success: false,
            message: 'Tham số MaBaiBlog không hợp lệ'
        });
    }

    try {
        const article = await newsDetailModel.getArticleById(Number(MaBaiPost));

        if (article) {
            res.render('news-detail', { article: article });
        } else {
            res.status(404).json({
                success: false,
                message: 'Bài báo không tồn tại'
            });
        }
    } catch (err) {
        console.error('Lỗi khi lấy bài báo theo ID:', err.message);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});


// API: Lấy top poster (nhà đăng bài nhiều nhất)
router.get('/', async (req, res) => {
    try {
        // Gọi model để lấy nhà đăng bài nhiều nhất
        const topPoster = await newsDetailModel.getTopPoster();

        // Kiểm tra nếu không có top poster
        if (!topPoster) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy top poster'
            });
        }

        // Trả về top poster dưới dạng JSON
        res.json({
            success: true,
            data: topPoster
        });
    } catch (err) {
        console.error('Lỗi khi lấy top poster:', err.message);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

module.exports = router;