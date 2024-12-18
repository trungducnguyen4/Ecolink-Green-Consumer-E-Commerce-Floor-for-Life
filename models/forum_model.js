const { poolPromise } = require('../db');
const { v4: uuidv4 } = require('uuid'); // Import uuid để tạo mã post

// Lấy tất cả bài viết từ bảng BaiPost
// Lấy tất cả bài viết từ bảng BaiPost
async function getForum() {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                bp.MaPost,
                bp.TenPost,
                bp.NoiDung,
                bp.ThoiGianDang,
                bp.MaNguoiBan,
                nb.HoUserCH + ' ' + nb.TenUserCH AS TenNguoiBan,
                nb.TenCuaHang,
                nb.DiaChi,
                bp.SoLuotThich,
                bp.SoLuotBinhLuan,
                bp.HinhAnh,
                bp.Video,
                bp.TrangThai,
                nb.AnhLogo
            FROM BaiPost bp
            LEFT JOIN NguoiBan nb ON bp.MaNguoiBan = nb.MaNguoiBan
        `;

        const result = await pool.request().query(query);
        const forum = result.recordset;

        // Cập nhật thời gian hiển thị
        const updatedForum = forum.map(post => {
            const thoiGianDang = new Date(post.ThoiGianDang);
            const thoiGianHienTai = new Date();
            const timeDiff = thoiGianHienTai - thoiGianDang;

            const diffSeconds = Math.floor(timeDiff / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffSeconds / (60 * 60));
            const diffDays = Math.floor(diffSeconds / (60 * 60 * 24));

            let displayTime = '';
            if (diffSeconds < 60) {
                displayTime = `${diffSeconds} giây trước`;
            } else if (diffMinutes < 60) {
                displayTime = `${diffMinutes} phút trước`;
            } else if (diffHours < 24) {
                displayTime = `${diffHours} giờ trước`;
            } else {
                displayTime = `${diffDays} ngày trước`;
            }

            return {
                ...post,
                displayTime,
            };
        });

        // Sắp xếp bài viết theo thời gian đăng (bài mới nhất lên đầu)
        updatedForum.sort((a, b) => new Date(b.ThoiGianDang) - new Date(a.ThoiGianDang));

        return updatedForum; // Trả về danh sách bài viết đã sắp xếp
    } catch (err) {
        console.error('Error fetching forum:', err);
        throw err;
    }
}


// Hàm theo dõi người bán
async function followSeller(maNguoiBan, maNguoiBanTheoDoi) {
    try {
        const pool = await poolPromise;

        // Kiểm tra xem người dùng đã theo dõi người bán chưa
        const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM Follow 
            WHERE MaNguoiBan = @maNguoiBan AND MaNguoiBanTheoDoi = @maNguoiBanTheoDoi
        `;
        const checkResult = await pool.request()
            .input('maNguoiBan', maNguoiBan)
            .input('maNguoiBanTheoDoi', maNguoiBanTheoDoi)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            throw new Error('Bạn đã theo dõi người bán này rồi.');
        }

        // Nếu chưa theo dõi, thêm vào bảng Follow
        const query = `
            INSERT INTO Follow (MaNguoiBan, MaNguoiBanTheoDoi, NgayTheoDoi)
            VALUES (@maNguoiBan, @maNguoiBanTheoDoi, GETDATE())
        `;
        await pool.request()
            .input('maNguoiBan', maNguoiBan)
            .input('maNguoiBanTheoDoi', maNguoiBanTheoDoi)
            .query(query);

        return { success: true, message: 'Đã theo dõi người bán thành công.' };
    } catch (err) {
        console.error('Error following seller:', err);
        throw err;
    }
}

// Hàm hủy theo dõi người bán
async function unfollowSeller(maNguoiBan, maNguoiBanTheoDoi) {
    try {
        const pool = await poolPromise;

        // Kiểm tra xem người dùng có đang theo dõi người bán này không
        const checkQuery = `
            SELECT COUNT(*) AS count 
            FROM Follow 
            WHERE MaNguoiBan = @maNguoiBan AND MaNguoiBanTheoDoi = @maNguoiBanTheoDoi
        `;
        const checkResult = await pool.request()
            .input('maNguoiBan', maNguoiBan)
            .input('maNguoiBanTheoDoi', maNguoiBanTheoDoi)
            .query(checkQuery);

        if (checkResult.recordset[0].count === 0) {
            throw new Error('Bạn chưa theo dõi người bán này.');
        }

        // Nếu đang theo dõi, hủy theo dõi
        const query = `
            DELETE FROM Follow 
            WHERE MaNguoiBan = @maNguoiBan AND MaNguoiBanTheoDoi = @maNguoiBanTheoDoi
        `;
        await pool.request()
            .input('maNguoiBan', maNguoiBan)
            .input('maNguoiBanTheoDoi', maNguoiBanTheoDoi)
            .query(query);

        return { success: true, message: 'Đã hủy theo dõi người bán thành công.' };
    } catch (err) {
        console.error('Error unfollowing seller:', err);
        throw err;
    }
}

// Hàm lấy danh sách người bán mà người dùng đang theo dõi
async function getFollowedSellers(maNguoiBan) {
    try {
        const pool = await poolPromise;

        const query = `
            SELECT nb.MaNguoiBan, nb.TenNguoiBan, nb.TenCuaHang 
            FROM Follow f
            JOIN NguoiBan nb ON f.MaNguoiBanTheoDoi = nb.MaNguoiBan
            WHERE f.MaNguoiBan = @maNguoiBan
        `;
        const result = await pool.request()
            .input('maNguoiBan', maNguoiBan)
            .query(query);

        return result.recordset;  // Trả về danh sách người bán đã theo dõi
    } catch (err) {
        console.error('Error fetching followed sellers:', err);
        throw err;
    }
}




async function createPost({ NoiDung, MaNguoiBan, HinhAnh }) {
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input('MaPost', uuidv4()) // Tạo mã bài viết tự động
        .input('NoiDung', NoiDung)
        .input('ThoiGianDang', new Date()) // Lấy thời gian hiện tại
        .input('MaNguoiBan', MaNguoiBan)
        .input('HinhAnh', HinhAnh)
        .query(`
            INSERT INTO BaiPost (NoiDung, ThoiGianDang, MaNguoiBan, SoLuotThich, SoLuotBinhLuan, HinhAnh, Video, TrangThai)
            OUTPUT INSERTED.*
            VALUES (@NoiDung, @ThoiGianDang, 'NB001', 0, 0, @HinhAnh, Null, 1)
        `);

    return result.recordset[0]; // Trả về bài viết vừa thêm
}

// Hàm cập nhật lượt like cho bài viết
async function updateLike(postId, isLike) {
    const pool = await poolPromise; // Kết nối với cơ sở dữ liệu

    const query = isLike
        ? `UPDATE BaiPost SET SoLuotThich = SoLuotThich + 1 WHERE MaPost = @postId AND TrangThai = 1`  // Tăng lượt thích
        : `UPDATE BaiPost SET SoLuotThich = SoLuotThich - 1 WHERE MaPost = @postId AND SoLuotThich > 0 AND TrangThai = 1`;  // Giảm lượt thích

    try {
        // Thực thi câu lệnh SQL với tham số đã truyền
        const result = await pool
            .request()
            .input('postId', postId)  // Truyền tham số postId vào câu lệnh SQL
            .query(query);

        return result.rowsAffected[0];  // Trả về số dòng bị ảnh hưởng (có thể là số lượt like được cập nhật)
    } catch (error) {
        console.error(`Error updating like for post ${postId}:`, error);
        throw new Error(`Không thể cập nhật like cho bài viết ${postId}: ${error.message}`);
    }
}



// Xuất khẩu cả hai hàm
module.exports = { 
    getForum,
    createPost, 
    updateLike,followSeller,
    unfollowSeller,
    getFollowedSellers 
};
