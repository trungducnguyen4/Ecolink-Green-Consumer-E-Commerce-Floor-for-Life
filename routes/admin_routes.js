const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin_model'); // Import model

// Route lấy danh sách bài viết
router.get('/', async (req, res) => {
    try {
        const admin = await adminModel.getBlog();  // Gọi hàm getForum từ model
        res.render('admin', { title: 'Admin', admin: admin });  // Truyền data sang view
    } catch (err) {
        console.error('Error fetching forum:', err);
        res.status(500).send('Server Error');
    }
});
// API GET để lấy bài viết theo ID
router.get('/getPost/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        // Lấy thông tin bài viết từ model
        const post = await adminModel.getPostById(postId);

        if (post) {
            res.json(post); // Trả về thông tin bài viết dưới dạng JSON
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài viết với ID này' });
        }
    } catch (err) {
        console.error('Lỗi khi lấy bài viết:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bài viết.' });
    }
});
// Cập nhật bài viết
router.put('/admin/updatePost/:id', async (req, res) => {
    const postId = req.params.id;
    const postData = req.body;

    try {
        const isUpdated = await updateBlog(postId, postData);  // Gọi hàm updateBlog trong model

        if (isUpdated) {
            res.status(200).json({ success: true, message: 'Bài viết đã được cập nhật thành công' });
        } else {
            res.status(404).json({ success: false, message: 'Bài viết không tồn tại hoặc không thay đổi' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi cập nhật bài viết', error: error.message });
    }
});


// API xóa bài viết
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await adminModel.deleteBlog(postId);
        if (result) {
            res.json({ message: `Bài viết với ID ${postId} đã bị xóa!` });
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài viết với ID này.' });
        }
    } catch (err) {
        console.error('Lỗi khi xóa bài viết:', err);  // In lỗi chi tiết
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết.' });
    }
});


// router.post('/savePost', express.json(), async (req, res) => {
//     const { title, content, category } = req.body;

//     // Kiểm tra dữ liệu đầu vào
//     if (!title || !content || !category) {
//         return res.status(400).json({
//             success: false,
//             message: 'Vui lòng cung cấp đầy đủ thông tin: tiêu đề, nội dung, và danh mục.'
//         });
//     }

//     const postData = { title, content, category };

//     try {
//         const isSaved = await adminModel.savePost(postData); // Gọi hàm xử lý lưu bài viết từ model

//         if (isSaved) {
//             return res.status(201).json({
//                 success: true,
//                 message: 'Bài viết đã được lưu thành công!',
//                 data: { title, content, category }
//             });
//         } else {
//             return res.status(500).json({
//                 success: false,
//                 message: 'Không thể lưu bài viết. Vui lòng thử lại sau!'
//             });
//         }
//     } catch (err) {
//         console.error('Lỗi khi xử lý lưu bài viết:', err.message); // Ghi log chi tiết lỗi
//         return res.status(500).json({
//             success: false,
//             message: 'Đã xảy ra lỗi trong quá trình lưu bài viết. Vui lòng thử lại sau!'
//         });
//     }
// });
// Định nghĩa route upload và lưu bài viết
// Cấu hình multer


const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('File không hợp lệ (chỉ chấp nhận ảnh hoặc video).'));
    },
});

// Sử dụng upload trong router
router.post('/savePost', upload.single('AnhBia'), async (req, res) => {
    try {
        // Logic xử lý lưu bài viết
        const { title, content, category } = req.body;
        const AnhBia = req.file ? `/upload/${req.file.filename}` : null;

        // Gọi hàm savePost với dữ liệu
        const postData = { title, content, category, AnhBia };
        const isSaved = await adminModel.savePost(postData);

        if (isSaved) {
            res.json({ success: true, message: 'Bài viết đã được lưu thành công!' });
        } else {
            res.status(500).json({ success: false, message: 'Lưu bài viết không thành công!' });
        }
    } catch (err) {
        console.error('Lỗi:', err);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi trong quá trình lưu bài viết!' });
    }
});

module.exports = router;
