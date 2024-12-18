const express = require('express');
const router = express.Router();
const forumModel = require('../models/forum_model'); // Import model

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


const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        // Đặt tên file bao gồm thời gian hiện tại và tên file gốc
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Khởi tạo multer với cấu hình đã định nghĩa
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận file ảnh hoặc video
        const filetypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true); // Chấp nhận file
        }
        cb(new Error('File không hợp lệ (chỉ chấp nhận ảnh hoặc video).'));
    },
});

// Định nghĩa router cho việc tạo bài viết
router.post('/create', upload.fields([{ name: 'HinhAnh', maxCount: 1 }]), async (req, res) => {
    const { MaNguoiBan, NoiDung } = req.body;

    // Kiểm tra nội dung bài viết
    if (!MaNguoiBan || !NoiDung) {
        return res.status(400).json({ error: 'Mã người bán và nội dung không được để trống.' });
    }

    // Kiểm tra xem có tệp được tải lên không
    console.log('Uploaded files:', req.files); // Kiểm tra tệp đã được tải lên chưa

    try {
        // Lấy đường dẫn ảnh đã tải lên (nếu có)
        const HinhAnh = req.files && req.files.HinhAnh && req.files.HinhAnh[0]
            ? `http://localhost:3000/upload/${req.files.HinhAnh[0].filename}` // Lưu đường dẫn ảnh đầy đủ
            : null;


        // Tạo bài viết mới với dữ liệu đã kiểm tra
        const newPost = await forumModel.createPost({ NoiDung, MaNguoiBan, HinhAnh });

        // Trả về kết quả khi bài viết được tạo thành công
        res.status(201).json({ message: 'Đăng bài thành công.', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Lỗi khi đăng bài.' });
    }
});

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
