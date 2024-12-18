const { poolPromise } = require('../db'); // Kết nối đến cơ sở dữ liệu
const moment = require('moment-timezone'); // Định dạng ngày giờ


// Hàm lấy danh sách bài viết theo danh mục
async function getNewsByCategory(category) {
    try {
        const pool = await poolPromise; // Lấy kết nối pool
        const result = await pool.request()
            .input('MaDanhMuc', category) // Truyền tham số danh mục
            .query(`
                SELECT 
                    BaiBlog.MaBaiBlog, 
                    BaiBlog.TieuDe, 
                    BaiBlog.NoiDung, 
                    BaiBlog.AnhBia, 
                    BaiBlog.NgayTao, 
                    BaiBlog.NgayCapNhat,
                    DanhMucBlog.TenDanhMuc, 
                    NguoiBan.TenCuaHang, 
                    TrangThai.TenTrangThai
                FROM BaiBlog
                INNER JOIN DanhMucBlog ON BaiBlog.MaDanhMuc = DanhMucBlog.MaDanhMuc
                INNER JOIN NguoiBan ON BaiBlog.MaNguoiBan = NguoiBan.MaNguoiBan
                INNER JOIN TrangThai ON BaiBlog.MaTrangThai = TrangThai.MaTrangThai
                WHERE BaiBlog.MaDanhMuc = @MaDanhMuc
                ORDER BY BaiBlog.NgayTao DESC
            `);

        // Định dạng ngày giờ theo múi giờ GMT+7
        result.recordset.forEach(blog => {
            blog.NgayTao = moment(blog.NgayTao)
                .tz('Asia/Bangkok') // Múi giờ Bangkok/Hà Nội
                .format('DD-MM-YYYY HH:mm:ss'); // Định dạng dd-mm-yyyy hh:mm:ss

            blog.NgayCapNhat = moment(blog.NgayCapNhat)
                .tz('Asia/Bangkok')
                .format('DD-MM-YYYY HH:mm:ss');
        });

        return result.recordset;
    } catch (err) {
        console.error('Error fetching news by category:', err);
        throw err;
    }
}

module.exports = { getNewsByCategory };
