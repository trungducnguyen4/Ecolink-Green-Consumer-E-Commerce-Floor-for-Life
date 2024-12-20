const { poolPromise } = require('../db'); // Kết nối DB
const sql = require('mssql');
const bcrypt = require('bcryptjs');

// Hàm xử lý đăng ký doanh nghiệp
async function registerBusiness(req, res) {
    try {
        const {
            TenDangNhap,
            MatKhau,
            HoUserCH,
            TenUserCH,
            GioiTinh,
            SoDienThoai,
            TenCuaHang,
            Email,
            MaSoThue,
        } = req.body;

        if (!req.file) {
            return res.status(400).send('Vui lòng upload giấy phép kinh doanh.');
        }

        const giayPhepKDPath = `GPKD/${req.file.filename}`;

        const pool = await poolPromise;

        // Lấy mã lớn nhất hiện có
        const maxCodeResult = await pool.request().query(`
            SELECT MAX(MaNguoiBan) AS MaxMaNguoiBan FROM NguoiBan
        `);

        let newCode = 'CH001'; // Mặc định nếu chưa có mã người bán nào
        if (maxCodeResult.recordset[0].MaxMaNguoiBan) {
            const maxCode = maxCodeResult.recordset[0].MaxMaNguoiBan; // Ví dụ: CH013
            const numericPart = parseInt(maxCode.replace('CH', ''), 10); // Lấy phần số: 13
            const nextNumber = numericPart + 1; // Tăng 1: 14
            newCode = `CH${nextNumber.toString().padStart(3, '0')}`; // Format lại: CH014
        }

        const existingUsername = await pool
            .request()
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .query('SELECT TenDangNhap FROM NguoiBan WHERE TenDangNhap = @TenDangNhap');
        if (existingUsername.recordset.length > 0) {
            return res.status(400).send('Tên đăng nhập đã tồn tại.');
        }

        const existingEmail = await pool
            .request()
            .input('Email', sql.NVarChar, Email)
            .query('SELECT Email FROM NguoiBan WHERE Email = @Email');
        if (existingEmail.recordset.length > 0) {
            return res.status(400).send('Email đã tồn tại.');
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(MatKhau, 10);

        // Thêm doanh nghiệp vào cơ sở dữ liệu
        await pool.request()
            .input('MaNguoiBan', sql.NChar, newCode) // Sử dụng mã mới tạo
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .input('MatKhau', sql.NVarChar, hashedPassword)
            .input('HoUserCH', sql.NVarChar, HoUserCH)
            .input('TenUserCH', sql.NVarChar, TenUserCH)
            .input('GioiTinh', sql.NVarChar, GioiTinh)
            .input('SoDienThoai', sql.NVarChar, SoDienThoai)
            .input('TenCuaHang', sql.NVarChar, TenCuaHang)
            .input('Email', sql.NVarChar, Email)
            .input('MaSoThue', sql.NVarChar, MaSoThue)
            .input('GiayPhepKD', sql.NVarChar, giayPhepKDPath)
            .query(`
                INSERT INTO NguoiBan (MaNguoiBan, TenDangNhap, MatKhau, HoUserCH, TenUserCH, GioiTinh, SoDienThoai, TenCuaHang, Email, MaSoThue, GiayPhepKD)
                VALUES (@MaNguoiBan, @TenDangNhap, @MatKhau, @HoUserCH, @TenUserCH, @GioiTinh, @SoDienThoai, @TenCuaHang, @Email, @MaSoThue, @GiayPhepKD)
            `);

        // Lưu thông tin người dùng vào session
        req.session.businessUser = {
            id: newCode,
            TenDangNhap,
            role: 'business',
        };

        res.status(201).json({ message: 'Đăng ký doanh nghiệp thành công.', redirectUrl: '/sale-chanels' });
    } catch (err) {
        console.error('Error in registerBusiness:', err);
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
}

module.exports = { registerBusiness };
