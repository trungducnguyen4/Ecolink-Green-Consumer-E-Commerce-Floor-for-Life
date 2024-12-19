const { poolPromise } = require('../db'); // Kết nối DB
const { v4: uuidv4 } = require('uuid');  // Thư viện tạo UUID

// Lấy tất cả bài viết
async function getForum() {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                bp.MaPost, bp.TenPost, bp.NoiDung, bp.ThoiGianDang,
                bp.MaNguoiBan, nb.HoUserCH + ' ' + nb.TenUserCH AS TenNguoiBan,
                nb.TenCuaHang, nb.DiaChi, bp.SoLuotThich,
                bp.SoLuotBinhLuan, bp.HinhAnh, bp.Video,
                bp.TrangThai, nb.AnhLogo
            FROM BaiPost bp
            LEFT JOIN NguoiBan nb ON bp.MaNguoiBan = nb.MaNguoiBan
        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching forum:', err);
        throw err;
    }
}

// Tạo bài viết mới
async function createPost({ NoiDung, MaNguoiBan, HinhAnh }) {
    try {
        const pool = await poolPromise;
        const query = `
            INSERT INTO BaiPost (NoiDung, ThoiGianDang, MaNguoiBan, SoLuotThich, SoLuotBinhLuan, HinhAnh, Video, TrangThai)
            OUTPUT INSERTED.*
            VALUES (@NoiDung, @ThoiGianDang, @MaNguoiBan, 0, 0, @HinhAnh, NULL, 1)
        `;
        const result = await pool
            .request()
            .input('NoiDung', NoiDung)
            .input('ThoiGianDang', new Date())
            .input('MaNguoiBan', MaNguoiBan)
            .input('HinhAnh', HinhAnh)
            .query(query);
        return result.recordset[0];
    } catch (err) {
        console.error('Error creating post:', err);
        throw err;
    }
}

// Cập nhật lượt thích
async function updateLike(postId, isLike) {
    try {
        const pool = await poolPromise;
        const query = isLike
            ? `UPDATE BaiPost SET SoLuotThich = SoLuotThich + 1 WHERE MaPost = @postId AND TrangThai = 1`
            : `UPDATE BaiPost SET SoLuotThich = SoLuotThich - 1 WHERE MaPost = @postId AND SoLuotThich > 0 AND TrangThai = 1`;
        const result = await pool
            .request()
            .input('postId', postId)
            .query(query);
        return result.rowsAffected[0];
    } catch (err) {
        console.error('Error updating like:', err);
        throw err;
    }
}

// Các hàm khác như follow/unfollow...
module.exports = {
    getForum,
    createPost,
    updateLike,
    // Các hàm khác nếu cần
};
