// models/newsDetail_model.js
const { poolPromise } = require('../db');
const sql = require('mssql'); // Đảm bảo đã require đúng thư viện

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

module.exports = { getArticleById };
