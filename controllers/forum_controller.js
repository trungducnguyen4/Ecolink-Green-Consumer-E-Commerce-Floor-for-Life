const multer = require('multer');
const path = require('path');
const { poolPromise,sql } = require('../db');
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

// Cấu hình multer để lưu hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload'); // Thư mục lưu hình ảnh
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

async function createPost(req, res) {
    try {
        const pool = await poolPromise;

        // Lấy dữ liệu từ form
        const { NoiDung } = req.body;
        const HinhAnh = req.file ? req.file.filename : null;

        // Lấy thông tin người đăng từ session
        const TenDangNhap = req.session.user
            ? req.session.user.TenDangNhap
            : req.session.businessUser
            ? req.session.businessUser.TenDangNhap
            : null;

        const LoaiNguoiDang = req.session.user
            ? 'user'
            : req.session.businessUser
            ? 'business'
            : null;

        // Kiểm tra người đăng
        if (!TenDangNhap || !LoaiNguoiDang) {
            return res.status(400).render('error', {
                message: 'Không thể đăng bài khi chưa đăng nhập'
            });
        }

        // Thêm bài viết vào database
        await pool.request()
            .input('TenDangNhap', sql.NVarChar(50), TenDangNhap)
            .input('LoaiNguoiDang', sql.NVarChar(20), LoaiNguoiDang)
            .input('NoiDung', sql.NVarChar('max'), NoiDung)
            .input('HinhAnh', sql.NVarChar(500), HinhAnh)
            .query(`
                INSERT INTO BaiPost (TenDangNhap, LoaiNguoiDang, NoiDung, HinhAnh)
                VALUES (@TenDangNhap, @LoaiNguoiDang, @NoiDung, @HinhAnh)
            `);

        // Redirect đến trang thành công
        res.redirect('/forum?success=true');
    } catch (err) {
        console.error('Lỗi khi thêm bài viết:', err);
        res.status(500).render('error', {
            message: 'Lỗi khi thêm bài viết.'
        });
    }
}

  
module.exports = { getForumPage, createPost, upload };