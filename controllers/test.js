const newsDetailModel = require('../models/newsDetail_model'); // Import model


async function getNewsPage(req, res) {
    const MaBaiPost = req.params.MaBaiBlog; // Lấy MaBaiBlog từ tham số URL

    try {
        // Lấy bài viết từ model theo MaBaiPost
        const newsDetail2 = await newsDetailModel.getRelatedArticles(MaBaiPost);

        // Nếu bài viết tồn tại, render trang chi tiết bài viết
        if (newsDetail2) {
            res.render('news-detail', { article2: newsDetail2 }); // Truyền dữ liệu bài viết vào view
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
module.exports = { getNewsPage }; // Xuất controller