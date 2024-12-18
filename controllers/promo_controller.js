const { poolPromise, sql } = require('../db');

async function applyPromoCode(req, res) {
    const { promoCode, shopId, totalAmount } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaKM', sql.NChar, promoCode)
            .query(`
                SELECT PhanTramGiam, NgayBatDau, NgayKetThuc, DieuKienGiam, MaNguoiBan
                FROM KhuyenMai
                WHERE MaKM = @MaKM
            `);

        if (result.recordset.length === 0) {
            return res.json({ success: false, message: 'Mã khuyến mãi không tồn tại.' });
        }

        const promo = result.recordset[0];
        const currentDate = new Date();

        if (promo.MaNguoiBan.trim() !== shopId.trim()) {
            return res.json({ success: false, message: 'Mã khuyến mãi không hợp lệ cho cửa hàng này.' });
        }

        if (currentDate < promo.NgayBatDau) {
            return res.json({ success: false, message: 'Mã khuyến mãi chưa có hiệu lực.' });
        }

        if (currentDate > promo.NgayKetThuc) {
            return res.json({ success: false, message: 'Mã khuyến mãi đã hết hạn.' });
        }

        if (promo.DieuKienGiam > totalAmount) {
            return res.json({ success: false, message: `Đơn hàng chưa đủ điều kiện để sử dụng mã khuyến mãi. Điều kiện: ${promo.DieuKienGiam} VND.` });
        }

        res.json({ success: true, discount: promo.PhanTramGiam });
    } catch (err) {
        console.error('Error applying promo code:', err);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi áp dụng mã khuyến mãi.' });
    }
}

module.exports = { applyPromoCode };
