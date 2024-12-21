// models/newsDetail_model.js
const { poolPromise } = require('../db');
const sql = require('mssql'); // Đảm bảo đã require đúng thư viện

// Lấy nhà đăng bài nhiều nhất
async function getTopPoster() {
    try {
        const pool = await poolPromise; // Kết nối đến pool
        const result = await pool.request()
            .query(`
                SELECT TOP 1 NB.MaNguoiBan, NB.TenCuaHang, NB.AnhLogo, COUNT(BB.MaNguoiBan) AS SoLuongBaiViet
                FROM BaiBlog BB
                INNER JOIN NguoiBan NB ON BB.MaNguoiBan = NB.MaNguoiBan
                GROUP BY NB.MaNguoiBan, NB.TenCuaHang, NB.AnhLogo
                ORDER BY SoLuongBaiViet DESC
            `); // Truy vấn SQL lấy nhà đăng bài nhiều nhất

        // Nếu không có bài viết nào
        if (result.recordset.length === 0) {
            return null;
        }

        // Trả về thông tin của người đăng bài nhiều nhất
        return result.recordset[0]; 
    } catch (err) {
        console.error('Error fetching top poster:', err.message);
        throw new Error('Could not fetch the top poster'); // Thông báo lỗi chi tiết
    }
}

// Lấy bài viết theo MaBaiBlog
async function getArticleById(MaBaiPost) {
    try {
        const pool = await poolPromise; // Kết nối đến pool
        const result = await pool.request()
            .input('MaBaiBlog', sql.Int, MaBaiPost) // Gán giá trị tham số cho MaBaiBlog
            .query("SELECT * FROM BaiBlog WHERE MaBaiBlog = @MaBaiBlog"); // Truy vấn theo MaBaiBlog
        
        // Nếu không tìm thấy bài viết
        if (result.recordset.length === 0) {
            return null;
        }

        // Trả về bài viết đầu tiên nếu tìm thấy
        return result.recordset[0]; 
    } catch (err) {
        console.error('Error fetching article by ID:', err.message);
        throw new Error('Could not fetch the article'); // Thông báo lỗi chi tiết
    }
}



// Lấy tất cả bài viết cùng mã danh mục nhưng loại trừ bài viết hiện tại
async function getRelatedArticles(MaBaiPost) {
    try {
        const pool = await poolPromise; // Kết nối đến pool

        // Truy vấn để lấy thông tin bài viết hiện tại (bao gồm MaDanhMuc)
        const currentPostResult = await pool.request()
            .input('MaBaiBlog', sql.Int, MaBaiPost)
            .query("SELECT MaDanhMuc FROM BaiBlog WHERE MaBaiBlog = @MaBaiBlog");

        // Nếu không tìm thấy bài viết
        if (currentPostResult.recordset.length === 0) {
            return null;
        }

        // Lấy mã danh mục từ bài viết hiện tại
        const MaDanhMuc = currentPostResult.recordset[0].MaDanhMuc;

        // Truy vấn tất cả bài viết cùng mã danh mục, loại trừ bài viết hiện tại
        const relatedPostsResult = await pool.request()
            .input('MaDanhMuc', sql.Int, MaDanhMuc)
            .input('MaBaiBlog', sql.Int, MaBaiPost)
            .query(`
                SELECT * 
                FROM BaiBlog 
                WHERE MaDanhMuc = @MaDanhMuc AND MaBaiBlog != @MaBaiBlog
            `);

        // Trả về danh sách bài viết
        return relatedPostsResult.recordset;
    } catch (err) {
        console.error('Error fetching related articles:', err.message);
        throw new Error('Could not fetch related articles'); // Thông báo lỗi chi tiết
    }
}

module.exports = { getArticleById, getTopPoster, getRelatedArticles  };
