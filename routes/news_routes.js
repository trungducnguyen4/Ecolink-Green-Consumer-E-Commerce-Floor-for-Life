const express = require('express');
const router = express.Router();
const newsModel = require('../models/news_model'); // Import model
const newsdetailModel = require('../models/newsDetail_model'); // Import model

// Route lấy danh sách bài viết theo danh mục
router.get('/', async (req, res) => {
    try {
        const category = req.query.category || 'NB'; // Mặc định 'NB'
        const news = await newsModel.getNewsByCategory(category); // Gọi model
        res.render('news', { title: 'News', news: news, category: category });
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).send('Server Error');
    }
});


// Route lấy danh sách bài viết theo danh mục với phân trang
// router.get('/', async (req, res) => {
//     try {
//         const category = req.query.category || 'NB'; // Mặc định là 'NB'
//         const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
//         const limit = parseInt(req.query.limit) || 5; // Số bài viết mỗi trang, mặc định là 5
//         const offset = (page - 1) * limit; // Tính toán offset cho truy vấn

//         const news = await newsModel.getNewsByCategory(category, offset, limit); // Gọi model với offset và limit
        
//         // Lấy tổng số bài viết để tính số trang
//         const totalArticles = await newsModel.getTotalArticlesByCategory(category);
//         const totalPages = Math.ceil(totalArticles / limit);

//         res.render('news', {
//             title: 'News',
//             news: news,
//             category: category,
//             pagination: {
//                 currentPage: page,
//                 totalPages: totalPages,
//                 totalArticles: totalArticles
//             }
//         });
//     } catch (err) {
//         console.error('Error fetching news:', err);
//         res.status(500).send('Server Error');
//     }
// });



// API: Lấy top poster (nhà đăng bài nhiều nhất)
router.get('/', async (req, res) => {
    try {
        // Gọi model để lấy nhà đăng bài nhiều nhất
        const topPoster = await newsModel.getTopPoster();

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