const express = require('express');
const router = express.Router();
const newsModel = require('../models/news_model'); // Import model

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



module.exports = router;