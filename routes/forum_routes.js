const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum_controller'); // Import controller
const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file với timestamp
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true); // Chấp nhận file
        }
        cb(new Error('File không hợp lệ (chỉ chấp nhận ảnh hoặc video).'));
    },
});

// Lấy danh sách bài viết
router.get('/', forumController.getForumPage);

// Theo dõi người bán
router.post('/follow', forumController.followSeller);

// Hủy theo dõi người bán
router.post('/unfollow', forumController.unfollowSeller);

// Lấy danh sách người bán mà người dùng theo dõi
router.get('/followed-sellers', forumController.getFollowedSellers);

// Tạo bài viết mới (có hỗ trợ upload file)
router.post('/create', upload.fields([{ name: 'HinhAnh', maxCount: 1 }]), forumController.createPost);

// Cập nhật lượt thích cho bài viết
router.post('/updateLike', forumController.updateLike);

module.exports = router;
