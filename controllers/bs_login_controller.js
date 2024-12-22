const bcrypt = require('bcryptjs');
const { poolPromise } = require('../db');
const sql = require('mssql');

async function loginBusiness(req, res) {
    const { TenDangNhap, MatKhau } = req.body;

    if (!TenDangNhap || !MatKhau) {
        return res.status(400).json({ message: 'Tên đăng nhập và mật khẩu là bắt buộc.' });
    }

    try {
        const pool = await poolPromise;

        // Kiểm tra tài khoản trong bảng NguoiBan
        const result = await pool.request()
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .query('SELECT * FROM NguoiBan WHERE TenDangNhap = @TenDangNhap OR Email = @TenDangNhap');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc email không tồn tại.' });
        }

        const business = result.recordset[0];

        let isPasswordValid = false;

        // Kiểm tra mật khẩu
        if (business.Email === 'oganica@gmail.com') {
            // Special case: plain text password comparison
            isPasswordValid = MatKhau === business.MatKhau;
        } else {
            // Regular case: hashed password comparison
            isPasswordValid = await bcrypt.compare(MatKhau, business.MatKhau);
        }

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
        }

        // Lưu thông tin người dùng vào session
        req.session.businessUser = {
            id: business.MaNguoiBan,
            TenDangNhap: business.TenDangNhap,
            AnhLogo: business.AnhLogo ? `/logo/${business.AnhLogo}` : '/logo/default-avatar.jpg', // Đường dẫn logo doanh nghiệp
            role: 'business',
        };

        res.status(200).send('Đăng nhập thành công!');
    } catch (err) {
        console.error('Error in loginBusiness:', err);
        return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
    }
}

module.exports = { loginBusiness };
