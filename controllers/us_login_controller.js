const bcrypt = require('bcryptjs');
const { poolPromise } = require('../db');
const sql = require('mssql');

// Đăng nhập cho người dùng
async function loginUser(req, res) {
    const { TenDangNhap, MatKhau } = req.body;

    if (!TenDangNhap || !MatKhau) {
        return res.status(400).send('Tên đăng nhập và mật khẩu là bắt buộc.');
    }

    try {
        const pool = await poolPromise;

        // Kiểm tra trong bảng NguoiDung (cho người dùng)
        const userResult = await pool.request()
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .query('SELECT * FROM NguoiDung WHERE TenDangNhap = @TenDangNhap or Email = @TenDangNhap or SoDienThoai = @TenDangNhap');

        if (userResult.recordset.length === 0) {
            return res.status(401).send('Tên đăng nhập, email, hoặc số điện thoại không tồn tại.');
        }

        const isMatch = await bcrypt.compare(MatKhau, userResult.recordset[0].MatKhau);
        if (!isMatch) {
            return res.status(401).send('Mật khẩu không đúng.');
        }

        // Nếu đăng nhập thành công
        req.session.user = userResult.recordset[0];
        res.status(200).send('Đăng nhập thành công!');
    } catch (err) {
        console.error('Error in loginUser:', err);
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng nhập.');
    }
}



module.exports = { loginUser};
