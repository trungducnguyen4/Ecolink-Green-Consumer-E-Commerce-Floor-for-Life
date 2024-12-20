const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum_controller'); // Import controller
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize body-parser middleware



// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Thư mục lưu file (nằm trong thư mục public)
        cb(null, path.join(__dirname, 'public', 'uploads')); // Đảm bảo sử dụng path.join để cấu hình đường dẫn chính xác
    },
    filename: (req, file, cb) => {
        // Đặt tên file với timestamp và giữ nguyên tên gốc
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Khởi tạo multer với cấu hình trên
const upload = multer({ storage: storage });

// Lấy danh sách bài viết
router.get('/', forumController.getForumPage);

// Theo dõi người bán
router.post('/follow', forumController.followSeller);

// Hủy theo dõi người bán
router.post('/unfollow', forumController.unfollowSeller);

// Lấy danh sách người bán mà người dùng theo dõi
router.get('/followed-sellers', forumController.getFollowedSellers);

// Tạo bài viết mới (có hỗ trợ upload file)
router.post('/create', upload.single('HinhAnh'), // Chỉ nhận một file ảnh từ input có name là 'HinhAnh'
    forumController.createPost,
);


// Cập nhật lượt thích cho bài viết
router.post('/updateLike', forumController.updateLike);

module.exports = router;
