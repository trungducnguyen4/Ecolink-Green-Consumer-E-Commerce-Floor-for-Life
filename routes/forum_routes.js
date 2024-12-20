const express = require('express');
const router = express.Router();
const forumModel = require('../models/forum_model'); // Import model
const forumController = require('../controllers/forum_controller');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
// Route lấy danh sách bài viết
router.get('/', async (req, res) => {
    try {
        const forum = await forumModel.getForum();  // Gọi hàm getForum từ model
        res.render('forum', { title: 'Forum', forum: forum });  // Truyền data sang view
    } catch (err) {
        console.error('Error fetching forum:', err);
        res.status(500).send('Server Error');
    }
});


// Route theo dõi người bán
router.post('/follow', async (req, res) => {
    const { followerId, sellerId } = req.body;
    
    try {
        const result = await forumModel.followSeller(followerId, sellerId); // Gọi hàm followSeller từ model
        res.status(200).json(result);  // Trả về kết quả
    } catch (err) {
        console.error('Error following seller:', err);
        res.status(500).json({ success: false, message: 'Server Error' });  // Trả về lỗi server nếu có
    }
});

// Route hủy theo dõi người bán
router.post('/unfollow', async (req, res) => {
    const { followerId, sellerId } = req.body;
    
    try {
        const result = await forumModel.unfollowSeller(followerId, sellerId); // Gọi hàm unfollowSeller từ model
        res.status(200).json(result);  // Trả về kết quả
    } catch (err) {
        console.error('Error unfollowing seller:', err);
        res.status(500).json({ success: false, message: 'Server Error' });  // Trả về lỗi server nếu có
    }
});

// Route lấy danh sách người bán mà người dùng đang theo dõi
router.get('/followed-sellers', async (req, res) => {
    const { followerId } = req.query;  // Lấy followerId từ query params

    try {
        const result = await forumModel.getFollowedSellers(followerId); // Gọi hàm getFollowedSellers từ model
        res.status(200).json(result);  // Trả về danh sách người bán đã theo dõi
    } catch (err) {
        console.error('Error fetching followed sellers:', err);
        res.status(500).json({ success: false, message: 'Server Error' });  // Trả về lỗi server nếu có
    }
});




// Định nghĩa router cho việc tạo bài viết
router.post('/create', forumController.upload.single('HinhAnh'), forumController.createPost);


// API cập nhật like cho bài viết
router.post('/updateLike', async (req, res) => {
    const { postId, like } = req.body;  // Lấy dữ liệu từ request body

    // Kiểm tra xem có thiếu dữ liệu không
    if (!postId || like === undefined) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin bài viết hoặc trạng thái like.' });
    }

    try {
        // Gọi model để cập nhật like
        const result = await forumModel.updateLike(postId, like);  
        return res.json({ success: true, message: 'Cập nhật like thành công', data: result });
    } catch (error) {
        console.error('Error updating like:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = router;