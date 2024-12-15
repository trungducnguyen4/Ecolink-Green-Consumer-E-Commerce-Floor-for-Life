const { poolPromise, sql } = require('../db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Cấu hình lưu trữ cho avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatar/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Lấy thông tin cá nhân của người dùng
async function getPersonalInfo(req, res) {
    const MaUser = req.session?.user?.id;

    if (!MaUser) {
        return res.redirect('/us-log-in');
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaUser', sql.Int, MaUser)
            .query(`
                SELECT TenDangNhap, TenUser, Email, SoDienThoai, DiaChi, GioiTinh, NgaySinh,
                       Avatar
                FROM NguoiDung
                WHERE MaUser = @MaUser
            `);

        if (result.recordset.length === 0) {
            return res.status(404).send('Không tìm thấy người dùng.');
        }

        const userInfo = result.recordset[0];
        res.render('personal', { user: userInfo });
    } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        res.status(500).send('Đã xảy ra lỗi.');
    }
}

// Cập nhật thông tin cá nhân của người dùng
async function updatePersonalInfo(req, res) {
    const MaUser = req.session?.user?.id;
    const { TenUser, Email, SoDienThoai, DiaChi, GioiTinh, NgaySinh } = req.body;
    const AvatarForSession = req.file ? `/avatar/${req.file.filename}` : null;
    const newAvatar = req.file ? req.file.filename : null; // Avatar mới nếu được tải lên

    if (!MaUser) {
        return res.status(401).json({ message: 'Không xác định được người dùng.' });
    }

    try {
        const pool = await poolPromise;

        // Lấy thông tin avatar cũ từ cơ sở dữ liệu
        const oldAvatarResult = await pool.request()
            .input('MaUser', sql.Int, MaUser)
            .query(`
                SELECT Avatar
                FROM NguoiDung
                WHERE MaUser = @MaUser
            `);

        const oldAvatar = oldAvatarResult.recordset[0]?.Avatar;

        // Cập nhật thông tin người dùng
        const query = `
            UPDATE NguoiDung
            SET 
                TenUser = COALESCE(NULLIF(@TenUser, ''), TenUser), 
                Email = COALESCE(NULLIF(@Email, ''), Email), 
                SoDienThoai = COALESCE(NULLIF(@SoDienThoai, ''), SoDienThoai), 
                DiaChi = COALESCE(NULLIF(@DiaChi, ''), DiaChi), 
                GioiTinh = COALESCE(NULLIF(@GioiTinh, ''), GioiTinh), 
                NgaySinh = COALESCE(NULLIF(@NgaySinh, ''), NgaySinh), 
                Avatar = COALESCE(@Avatar, Avatar)
            WHERE MaUser = @MaUser
        `;

        await pool.request()
            .input('TenUser', sql.NVarChar(30), TenUser || null)
            .input('Email', sql.NVarChar(100), Email || null)
            .input('SoDienThoai', sql.NVarChar(15), SoDienThoai || null)
            .input('DiaChi', sql.NVarChar(150), DiaChi || null)
            .input('GioiTinh', sql.NVarChar(10), GioiTinh || null)
            .input('NgaySinh', sql.Date, NgaySinh || null)
            .input('Avatar', sql.NVarChar(300), newAvatar ? `${newAvatar}` : null)
            .input('MaUser', sql.Int, MaUser)
            .query(query);

        // Xóa avatar cũ nếu có và không phải ảnh mặc định
        if (newAvatar && oldAvatar && oldAvatar !== '/avatar/default-avatar.jpg') {
            const oldAvatarPath = path.join(__dirname, '../public/avatar/', oldAvatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // Cập nhật session với avatar mới nếu có thay đổi
        if (newAvatar) {
            req.session.user.AnhAvatar = `/avatar/${newAvatar}`;
        }

        
        console.log('Cập nhật thành công.');
        res.status(200).send('Thông tin đã được cập nhật thành công.');
        
    } catch (err) {
        console.error('Lỗi khi cập nhật hồ sơ:', err);
        res.status(500).send('Đã xảy ra lỗi khi cập nhật thông tin.');
    }
}

module.exports = {
    getPersonalInfo,
    updatePersonalInfo,
    upload
};
