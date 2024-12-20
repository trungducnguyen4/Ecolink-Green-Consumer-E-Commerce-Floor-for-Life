// controllers/productController.js
const newsModel = require('../models/news_model');

async function getNewsPage(req, res) {
    try {
        const news = await newsModel.getNews();
        res.render('news', { news });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}



  
module.exports = { getNewsPage };
