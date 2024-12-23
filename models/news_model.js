const { poolPromise } = require('../db'); // Kết nối đến cơ sở dữ liệu
const moment = require('moment-timezone'); // Định dạng ngày giờ


//Hàm lấy danh sách bài viết theo danh mục
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
                .tz('Asia/Bangkok').subtract(7,'hour') // Múi giờ Bangkok/Hà Nội
                .format('DD-MM-YYYY HH:mm:ss'); // Định dạng dd-mm-yyyy hh:mm:ss

            blog.NgayCapNhat = moment(blog.NgayCapNhat)
                .tz('Asia/Bangkok').subtract(7,'hour')
                .format('DD-MM-YYYY HH:mm:ss');
        });

        return result.recordset;
    } catch (err) {
        console.error('Error fetching news by category:', err);
        throw err;
    }
}

// async function getNewsByCategory(category, offset, limit) {
//     try {
//         const pool = await poolPromise;
//         const result = await pool.request()
//             .input('MaDanhMuc', category)
//             .input('Offset', offset)
//             .input('Limit', limit)
//             .query(`
//                 SELECT 
//                     BaiBlog.MaBaiBlog, 
//                     BaiBlog.TieuDe, 
//                     BaiBlog.NoiDung, 
//                     BaiBlog.AnhBia, 
//                     BaiBlog.NgayTao, 
//                     BaiBlog.NgayCapNhat,
//                     DanhMucBlog.TenDanhMuc, 
//                     NguoiBan.TenCuaHang, 
//                     TrangThai.TenTrangThai
//                 FROM BaiBlog
//                 INNER JOIN DanhMucBlog ON BaiBlog.MaDanhMuc = DanhMucBlog.MaDanhMuc
//                 INNER JOIN NguoiBan ON BaiBlog.MaNguoiBan = NguoiBan.MaNguoiBan
//                 INNER JOIN TrangThai ON BaiBlog.MaTrangThai = TrangThai.MaTrangThai
//                 WHERE BaiBlog.MaDanhMuc = @MaDanhMuc
//                 ORDER BY BaiBlog.NgayTao DESC
//                 OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY
//             `);

//         return result.recordset;
//     } catch (err) {
//         console.error('Error fetching news by category:', err);
//         throw err;
//     }
// }


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


module.exports = { getNewsByCategory, getTopPoster };
