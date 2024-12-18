const { poolPromise } = require('../db');
const sql = require('mssql');

async function loadOrderPaymentPage(req, res) {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

    let userId = req.session.user.id.toString();
    userId = userId.padEnd(20, ' ');

    try {
        const pool = await poolPromise;

        // Fetch cart items
        const cartResult = await pool.request()
            .input('MaUser', sql.NChar, userId)
            .query(`
                SELECT sp.MaSP, sp.TenSP, sp.HinhChinh, sp.DGBanMacDinh, stg.SoLuongSPTrongGio,
                       nb.TenCuaHang, nb.AnhLogo, nb.MaNguoiBan
                FROM SanPhamTrongGio stg
                JOIN SanPham sp ON stg.MaSP = sp.MaSP
                JOIN NguoiBan nb ON sp.MaNguoiBan = nb.MaNguoiBan
                WHERE stg.MaUser = @MaUser
            `);

        const cartItems = cartResult.recordset;

        // Fetch user address and phone number
        const userResult = await pool.request()
            .input('MaUser', sql.NChar, userId)
            .query(`
                SELECT HoUser, TenUser, SoDienThoai, DiaChi
                FROM NguoiDung
                WHERE MaUser = @MaUser
            `);

        const user = userResult.recordset[0];

        // Fetch payment methods
        const paymentMethodsResult = await pool.request()
            .query(`
                SELECT MaPTTT, TenPTTT, MoTaPTTT
                FROM PhuongThucThanhToan
            `);

        const paymentMethods = paymentMethodsResult.recordset;

        // Fetch shipping methods
        const shippingMethodsResult = await pool.request()
            .query(`
                SELECT MaPTVC, TenPTVC, PhiVC, ThoiGianGH
                FROM PhuongThucVanChuyen
            `);

        const shippingMethods = shippingMethodsResult.recordset;

        res.render('order-payment', { title: 'Order Payment', cartItems, user, paymentMethods, shippingMethods });
    } catch (err) {
        console.error('Error loading order payment page:', err);
        res.status(500).send('Error loading order payment page');
    }
}

module.exports = { loadOrderPaymentPage };
