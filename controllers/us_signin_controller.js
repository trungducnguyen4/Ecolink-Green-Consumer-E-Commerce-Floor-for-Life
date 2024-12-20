const { poolPromise } = require('../db');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
    const { TenDangNhap, MatKhau, HoUser, TenUser, GioiTinh, SoDienThoai, DiaChi, Email } = req.body;

    try {
        console.log('Dữ liệu nhận từ client:', req.body); // Log dữ liệu từ client

        const pool = await poolPromise;

        // Kiểm tra tên đăng nhập trùng lặp
        const existingUser = await pool.request()
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .query('SELECT TenDangNhap FROM NguoiDung WHERE TenDangNhap = @TenDangNhap');

        if (existingUser.recordset.length > 0) {
            console.log('Tên đăng nhập trùng lặp:', TenDangNhap);
            return res.status(400).send('Tên đăng nhập đã tồn tại.');
        }

        // Kiểm tra email trùng lặp
        const existingEmail = await pool.request()
            .input('Email', sql.NVarChar, Email)
            .query('SELECT Email FROM NguoiDung WHERE Email = @Email');

        if (existingEmail.recordset.length > 0) {
            console.log('Email trùng lặp:', Email);
            return res.status(400).send('Email đã được sử dụng.');
        }

        // Lấy mã lớn nhất hiện có
        // const maxCodeResult = await pool.request().query('SELECT MAX(MaUser) AS MaxMaUser FROM NguoiDung');
        // let newCode = 1; // Mặc định nếu chưa có mã người dùng nào
        // if (maxCodeResult.recordset[0].MaxMaUser) {
        //     newCode = maxCodeResult.recordset[0].MaxMaUser + 1;
        // }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(MatKhau, 10);
        console.log('Mã hóa mật khẩu thành công.');

        // Thêm người dùng vào cơ sở dữ liệu
        await pool.request()
            //.input('MaUser', sql.Int, newCode)
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .input('MatKhau', sql.NVarChar, hashedPassword)
            .input('HoUser', sql.NVarChar, HoUser)
            .input('TenUser', sql.NVarChar, TenUser)
            .input('GioiTinh', sql.NVarChar, GioiTinh)
            .input('SoDienThoai', sql.NVarChar, SoDienThoai)
            .input('DiaChi', sql.NVarChar, DiaChi)
            .input('Email', sql.NVarChar, Email)
            .query(`
                INSERT INTO NguoiDung (TenDangNhap, MatKhau, HoUser, TenUser, GioiTinh, SoDienThoai, DiaChi, Email)
                VALUES ( @TenDangNhap, @MatKhau, @HoUser, @TenUser, @GioiTinh, @SoDienThoai, @DiaChi, @Email)
            `);

        console.log('Thêm người dùng thành công.');
        res.status(201).send('Đăng ký thành công.');
    } catch (err) {
        console.error('Error in createUser:', err.message); // Log lỗi chi tiết
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
}

module.exports = { createUser };