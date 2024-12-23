// models/productModel.js
const { poolPromise } = require('../db');


// npm install moment-timezone
const moment = require('moment-timezone');

async function getBlog() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                BaiBlog.MaBaiBlog, 
                BaiBlog.TieuDe, 
                BaiBlog.NoiDung, 
                BaiBlog.NgayTao, 
                BaiBlog.NgayCapNhat,
                DanhMucBlog.TenDanhMuc, 
                NguoiBan.TenCuaHang, 
                TrangThai.TenTrangThai
            FROM BaiBlog
            INNER JOIN DanhMucBlog ON BaiBlog.MaDanhMuc = DanhMucBlog.MaDanhMuc
            INNER JOIN NguoiBan ON BaiBlog.MaNguoiBan = NguoiBan.MaNguoiBan
            INNER JOIN TrangThai ON BaiBlog.MaTrangThai = TrangThai.MaTrangThai
            ORDER BY BaiBlog.NgayTao DESC
        `);

        // Định dạng ngày giờ theo múi giờ GMT+7
        result.recordset.forEach(blog => {
            const formattedDateTime = moment(blog.NgayTao)
                .tz('Asia/Bangkok') // Chọn múi giờ Hà Nội/Bangkok
                .format('DD-MM-YYYY HH:mm:ss'); // Định dạng dd-mm-yyyy hh:mm:ss
            blog.NgayTao = formattedDateTime;
        });

        return result.recordset;
    } catch (err) {
        console.error('Error fetching blogs:', err);
        throw err;
    }
}

// Hàm lấy bài viết theo ID
async function getPostById(postId) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('postId', postId) // Truyền tham số vào câu lệnh SQL
            .query(`
                SELECT 
                    BaiBlog.TieuDe, 
                    BaiBlog.NoiDung,
                    BaiBlog.AnhBia,
                    DanhMucBlog.TenDanhMuc, 
                    NguoiBan.TenCuaHang
                FROM BaiBlog
                INNER JOIN DanhMucBlog ON BaiBlog.MaDanhMuc = DanhMucBlog.MaDanhMuc
                INNER JOIN NguoiBan ON BaiBlog.MaNguoiBan = NguoiBan.MaNguoiBan
                INNER JOIN TrangThai ON BaiBlog.MaTrangThai = TrangThai.MaTrangThai
                WHERE BaiBlog.MaBaiBlog = @postId
            `);

        // Kiểm tra nếu có bài viết
        if (result.recordset.length === 0) {
            return null; // Nếu không tìm thấy bài viết, trả về null
        }

        // Định dạng ngày giờ theo múi giờ GMT+7
        result.recordset.forEach(blog => {
            const formattedDateTime = moment(blog.NgayTao)
                .tz('Asia/Bangkok') // Chọn múi giờ Hà Nội/Bangkok
                .format('DD-MM-YYYY HH:mm:ss'); // Định dạng dd-mm-yyyy hh:mm:ss
            blog.NgayTao = formattedDateTime;
        });

        // Trả về dữ liệu bài viết
        return result.recordset[0]; // Trả về bài viết đầu tiên (vì tìm kiếm theo ID nên chỉ có 1 bài)
    } catch (err) {
        console.error('Error fetching post by ID:', err);
        throw err;
    }
}


async function updatePost(postId, postData) {
    try {
        const pool = await poolPromise; // Kết nối đến database pool

        // // Truy vấn mã danh mục dựa trên tên danh mục
        // const categoryResult = await pool.request()
        //     .input('categoryName', postData.category)
        //     .query(`SELECT MaDanhMuc FROM DanhMucBlog WHERE TenDanhMuc = @categoryName`);

        // // Kiểm tra nếu không tìm thấy mã danh mục
        // if (categoryResult.recordset.length === 0) {
        //     throw new Error(`Không tìm thấy danh mục: ${postData.category}`);
        // }

        // const maDanhMuc = categoryResult.recordset[0].MaDanhMuc; // Lấy mã danh mục

        // Thực hiện cập nhật bài viết trong bảng BaiBlog
        const result = await pool.request()
            .input('postId', postId)
            .input('title', postData.title)
            .input('content', postData.content)
            .input('category', postData.category)
            .input('AnhBia', postData.AnhBia || null) // Nếu không có ảnh bìa, lưu null
            .query(`
                UPDATE BaiBlog
                SET TieuDe = @title,
                    NoiDung = 'abcdef',
                    MaDanhMuc = 'SKH',
                    AnhBia = 'https://i.pinimg.com/474x/be/a4/83/bea4836ad6c98b6f4093fb75ade591c8.jpg'
                WHERE MaBaiBlog = @postId
            `);

        // Kiểm tra xem bài viết có được cập nhật thành công hay không
        if (result.rowsAffected[0] > 0) {
            return true; // Cập nhật thành công
        } else {
            return false; // Không có bài viết nào được cập nhật
        }
    } catch (err) {
        // Ghi log lỗi chi tiết
        console.error('Lỗi khi cập nhật bài viết trong cơ sở dữ liệu:', err);
        throw new Error('Có lỗi xảy ra khi cập nhật bài viết vào cơ sở dữ liệu.'); // Ném lỗi để controller xử lý
    }
}

async function deleteBlog(postId) {
    console.log(`Xóa bài viết với ID: ${postId}`);
    try {
        const pool = await poolPromise;  // Lấy kết nối từ pool
        const result = await pool.request()  // Sử dụng pool.request() thay vì db.query
            .input('MaBaiBlog', postId)  // Truyền tham số trực tiếp
            .query('DELETE FROM BaiBlog WHERE MaBaiBlog = @MaBaiBlog');  // Sử dụng câu lệnh DELETE với tham số

        console.log('Kết quả xóa:', result);
        return result.rowsAffected[0] > 0;  // Kiểm tra nếu có dòng bị ảnh hưởng (đã xóa thành công)
    } catch (err) {
        console.error('Lỗi khi xóa bài viết trong database:', err);
        throw err;
    }
}


// Hàm lưu bài viết
// async function savePost(postData) {
//     try {
//         const pool = await poolPromise; // Kết nối đến database pool

//         // Truy vấn mã danh mục dựa trên tên danh mục
//         const categoryResult = await pool.request()
//             .input('categoryName', postData.category)
//             .query(`SELECT MaDanhMuc FROM DanhMucBlog WHERE TenDanhMuc = @categoryName`);

//         // Kiểm tra nếu không tìm thấy mã danh mục
//         if (categoryResult.recordset.length === 0) {
//             throw new Error(`Không tìm thấy danh mục: ${postData.category}`);
//         }

//         const maDanhMuc = categoryResult.recordset[0].MaDanhMuc; // Lấy mã danh mục

//         // Thực hiện chèn bài viết vào bảng BaiBlog
//         const result = await pool.request()
//             .input('title', postData.title)
//             .input('content', postData.content)
//             .input('category', maDanhMuc)
//             .query(`
//                 INSERT INTO BaiBlog (TieuDe, NoiDung, MaDanhMuc, MaTrangThai, MaNguoiBan)
//                 VALUES (@title, @content, @category, 'DD', N'NB015') 
//             `);

//         // Kiểm tra xem bài viết có được lưu thành công hay không
//         if (result.rowsAffected[0] > 0) {
//             return true; // Lưu thành công
//         } else {
//             return false; // Không lưu thành công
//         }
//     } catch (err) {
//         // Ghi log lỗi chi tiết
//         console.error('Lỗi khi lưu bài viết vào cơ sở dữ liệu:', err);
//         throw new Error('Có lỗi xảy ra khi lưu bài viết vào cơ sở dữ liệu.'); // Ném lỗi để controller xử lý
//     }
// }


async function savePost(postData) {
    try {
        const pool = await poolPromise; // Kết nối đến database pool

        // Truy vấn mã danh mục dựa trên tên danh mục
        const categoryResult = await pool.request()
            .input('categoryName', postData.category)
            .query(`SELECT MaDanhMuc FROM DanhMucBlog WHERE TenDanhMuc = @categoryName`);

        // Kiểm tra nếu không tìm thấy mã danh mục
        if (categoryResult.recordset.length === 0) {
            throw new Error(`Không tìm thấy danh mục: ${postData.category}`);
        }

        const maDanhMuc = categoryResult.recordset[0].MaDanhMuc; // Lấy mã danh mục

        // Thực hiện chèn bài viết vào bảng BaiBlog
        const result = await pool.request()
            .input('title', postData.title)
            .input('content', postData.content)
            .input('category', maDanhMuc)
            .input('AnhBia', postData.AnhBia || null) // Nếu không có ảnh bìa, lưu null
            .query(`
                INSERT INTO BaiBlog (TieuDe, NoiDung, MaDanhMuc, AnhBia, MaTrangThai, MaNguoiBan)
                VALUES (@title, @content, @category, @AnhBia, 'DD', N'NB015') 
            `);

        // Kiểm tra xem bài viết có được lưu thành công hay không
        if (result.rowsAffected[0] > 0) {
            return true; // Lưu thành công
        } else {
            return false; // Không lưu thành công
        }
    } catch (err) {
        // Ghi log lỗi chi tiết
        console.error('Lỗi khi lưu bài viết vào cơ sở dữ liệu:', err);
        throw new Error('Có lỗi xảy ra khi lưu bài viết vào cơ sở dữ liệu.'); // Ném lỗi để controller xử lý
    }
}



module.exports = { getBlog, deleteBlog, savePost, getPostById, updatePost };
