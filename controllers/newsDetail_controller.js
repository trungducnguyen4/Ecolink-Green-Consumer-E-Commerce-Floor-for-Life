const newsDetailModel = require('../models/newsDetail_model'); // Import model

// Controller để lấy chi tiết bài báo theo MaBaiBlog
async function getNewsDetailPage(req, res) {
    const MaBaiPost = req.params.MaBaiBlog; // Lấy MaBaiBlog từ tham số URL

    try {
        // Lấy bài viết từ model theo MaBaiPost
        const newsDetail = await newsDetailModel.getArticleById(MaBaiPost);

        // Nếu bài viết tồn tại, render trang chi tiết bài viết
        if (newsDetail) {
            res.render('news-detail', { article: newsDetail }); // Truyền dữ liệu bài viết vào view
        } else {
            // Nếu không tìm thấy bài viết
            res.status(404).json({
                success: false,
                message: 'Bài báo không tồn tại'
            });
        }
    } catch (err) {
        console.error('Lỗi khi lấy bài viết:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getNewsDetailPage }; // Xuất controller
