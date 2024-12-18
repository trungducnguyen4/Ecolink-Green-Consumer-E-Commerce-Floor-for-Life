// controllers/productController.js
const forumModel = require('../models/forum_model');

async function getForumPage(req, res) {
    try {
        const forum = await forumModel.getForum();
        res.render('forum', { forum });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}
  
module.exports = { getForumPage };

