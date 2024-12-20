const { poolPromise } = require('../db'); // Kết nối DB
const { v4: uuidv4 } = require('uuid');  // Thư viện tạo UUID

// Lấy tất cả bài viết
async function getForum() {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                bp.MaPost, bp.TenPost, bp.NoiDung, bp.ThoiGianDang,
                bp.TenDangNhap, nb.HoUserCH + ' ' + nb.TenUserCH AS TenNguoiBan, nd.HoUser + ' ' + nd.TenUser AS TenNguoiDung ,
                nb.TenCuaHang, nb.DiaChi, bp.SoLuotThich,
                bp.SoLuotBinhLuan, bp.HinhAnh, bp.Video,
                bp.TrangThai, nb.AnhLogo
            FROM BaiPost bp
            LEFT JOIN NguoiBan nb ON bp.TenDangNhap = nb.TenDangNhap
			LEFT JOIN NguoiDung nd ON bp.TenDangNhap = nd.TenDangNhap

        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching forum:', err);
        throw err;
    }
}

// Tạo bài viết mới
async function createPost(postData) {
    const { NoiDung, TenDangNhap, LoaiNguoiDang, HinhAnh } = postData;

    try {
        const request = new sql.Request();

        // Thêm tham số vào yêu cầu
        request.input('NoiDung', sql.NVarChar, NoiDung);  // NVarChar cho chuỗi
        request.input('TenDangNhap', sql.NVarChar, TenDangNhap);  // TenDangNhap là chuỗi
        request.input('LoaiNguoiDang', sql.NVarChar, LoaiNguoiDang);  // LoaiNguoiDang là chuỗi
        request.input('HinhAnh', sql.NVarChar, HinhAnh || null);  // HinhAnh có thể null nếu không có

        // Câu truy vấn SQL
        const query = `
            INSERT INTO BaiPost (NoiDung, TenDangNhap, LoaiNguoiDang, HinhAnh)
            OUTPUT inserted.*
            VALUES (@NoiDung, @TenDangNhap, @LoaiNguoiDang, @HinhAnh)
        `;

        // Thực thi truy vấn
        const result = await request.query(query);

        // Trả về kết quả
        return result.recordset[0];  // Lấy bài viết vừa được tạo
    } catch (err) {
        console.error('Lỗi khi tạo bài viết:', err);
        throw new Error('Lỗi khi tạo bài viết');
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
