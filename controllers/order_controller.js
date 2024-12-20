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

async function loadPurchaseOrderStatusPage(req, res) {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

    let userId = req.session.user.id.toString();
    userId = userId.padEnd(20, ' ');

    try {
        const pool = await poolPromise;

        // Fetch all orders for the user
        const ordersResult = await pool.request()
            .input('MaUser', sql.NChar, userId)
            .query(`
                SELECT dh.MaDH, dh.NgayDatHang, dh.TongThanhToan, dh.TrangThai, ptvc.TenPTVC, nb.TenCuaHang, nb.AnhLogo, sp.TenSP, sp.HinhChinh, ctdh.SoLuongSP, ctdh.DonGia
                FROM DonHang dh
                JOIN CTDH ctdh ON dh.MaDH = ctdh.MaDH
                JOIN SanPham sp ON ctdh.MaSP = sp.MaSP
                JOIN NguoiBan nb ON ctdh.MaNguoiBan = nb.MaNguoiBan
                JOIN PhuongThucVanChuyen ptvc ON dh.TongPhiVC = ptvc.PhiVC
                WHERE dh.MaUser = @MaUser
                ORDER BY dh.NgayDatHang DESC
            `);

        const orders = ordersResult.recordset;

        res.render('purchaseOrderStatus', { title: 'Purchase Order Status', orders });
    } catch (err) {
        console.error('Error loading purchase order status page:', err);
        res.status(500).send('Error loading purchase order status page');
    }
}

async function placeOrder(req, res) {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

    const userId = req.session.user.id.toString().padEnd(20, ' ');
    const { paymentMethod, shippingMethod, specialRequest } = req.body;

    try {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);

        await transaction.begin();

        // Generate order ID
        const orderIdResult = await transaction.request()
            .query('SELECT COUNT(*) AS Total FROM DonHang');
        const orderId = `DH${orderIdResult.recordset[0].Total + 1}`;

        // Fetch shipping fee
        const shippingFeeResult = await transaction.request()
            .input('MaPTVC', sql.NChar(20), shippingMethod)
            .query(`
                SELECT PhiVC
                FROM PhuongThucVanChuyen
                WHERE MaPTVC = @MaPTVC
            `);

        const shippingFee = shippingFeeResult.recordset[0].PhiVC;

        // Insert into DonHang
        await transaction.request()
            .input('MaDH', sql.NChar(20), orderId)
            .input('MaUser', sql.NChar(20), userId)
            .input('TongPhiVC', sql.Decimal(10, 2), shippingFee)
            .input('TongGiamGia', sql.Decimal(10, 2), 0) // Placeholder, will update later
            .input('TongThanhToan', sql.Decimal(10, 2), 0) // Placeholder, will update later
            .input('TrangThai', sql.NVarChar(50), 'Chờ xác nhận')
            .query(`
                INSERT INTO DonHang (MaDH, MaUser, NgayDatHang, TongPhiVC, TongGiamGia, TongThanhToan, TrangThai)
                VALUES (@MaDH, @MaUser, GETDATE(), @TongPhiVC, @TongGiamGia, @TongThanhToan, @TrangThai)
            `);

        // Fetch cart items
        const cartItemsResult = await transaction.request()
            .input('MaUser', sql.NChar(20), userId)
            .query(`
                SELECT sp.MaSP, sp.DGBanMacDinh, stg.SoLuongSPTrongGio, nb.MaNguoiBan
                FROM SanPhamTrongGio stg
                JOIN SanPham sp ON stg.MaSP = sp.MaSP
                JOIN NguoiBan nb ON sp.MaNguoiBan = nb.MaNguoiBan
                WHERE stg.MaUser = @MaUser
            `);

        const cartItems = cartItemsResult.recordset;

        // Group items by seller
        const groupedItems = cartItems.reduce((acc, item) => {
            if (!acc[item.MaNguoiBan]) {
                acc[item.MaNguoiBan] = [];
            }
            acc[item.MaNguoiBan].push(item);
            return acc;
        }, {});

        let totalAmount = 0;
        let totalDiscount = 0;

        // Insert into CTDH
        for (const [sellerId, items] of Object.entries(groupedItems)) {
            for (const item of items) {
                const itemTotal = item.DGBanMacDinh * item.SoLuongSPTrongGio;
                totalAmount += itemTotal;

                await transaction.request()
                    .input('MaDH', sql.NChar(20), orderId)
                    .input('MaSP', sql.NChar(20), item.MaSP)
                    .input('MaNguoiBan', sql.NChar(20), sellerId)
                    .input('MaPTVC', sql.NChar(20), shippingMethod)
                    .input('SoLuongSP', sql.Int, item.SoLuongSPTrongGio)
                    .input('DonGia', sql.Decimal(10, 2), item.DGBanMacDinh)
                    .input('PhiVanChuyen', sql.Decimal(10, 2), shippingFee)
                    .input('GiamGia', sql.Decimal(10, 2), 0) // Placeholder, will update later
                    .query(`
                        INSERT INTO CTDH (MaSP, MaDH, MaNguoiBan, MaPTVC, SoLuongSP, DonGia, PhiVanChuyen, GiamGia)
                        VALUES (@MaSP, @MaDH, @MaNguoiBan, @MaPTVC, @SoLuongSP, @DonGia, @PhiVanChuyen, @GiamGia)
                    `);
            }
        }

        // Update total amounts in DonHang
        await transaction.request()
            .input('MaDH', sql.NChar(20), orderId)
            .input('TongPhiVC', sql.Decimal(10, 2), shippingFee)
            .input('TongGiamGia', sql.Decimal(10, 2), totalDiscount)
            .input('TongThanhToan', sql.Decimal(10, 2), totalAmount + shippingFee - totalDiscount)
            .query(`
                UPDATE DonHang
                SET TongPhiVC = @TongPhiVC, TongGiamGia = @TongGiamGia, TongThanhToan = @TongThanhToan
                WHERE MaDH = @MaDH
            `);

        await transaction.commit();

        res.json({ success: true, orderId });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
}

async function loadSellerOrders(req, res) {
    if (!req.session.businessUser) {
        return res.status(401).send('User not logged in');
    }

    let sellerId = req.session.businessUser.id.toString();
    sellerId = sellerId.padEnd(20, ' ');

    try {
        const pool = await poolPromise;

        // Fetch orders for the seller
        const ordersResult = await pool.request()
            .input('MaNguoiBan', sql.NChar, sellerId)
            .query(`
                SELECT dh.MaDH, dh.NgayDatHang, dh.TongThanhToan, dh.TrangThai, ptvc.TenPTVC, nd.HoUser, nd.TenUser, sp.TenSP, sp.HinhChinh, ctdh.SoLuongSP, ctdh.DonGia
                FROM DonHang dh
                JOIN CTDH ctdh ON dh.MaDH = ctdh.MaDH
                JOIN SanPham sp ON ctdh.MaSP = sp.MaSP
                JOIN NguoiDung nd ON dh.MaUser = nd.MaUser
                JOIN PhuongThucVanChuyen ptvc ON ctdh.MaPTVC = ptvc.MaPTVC
                WHERE ctdh.MaNguoiBan = @MaNguoiBan
                ORDER BY dh.NgayDatHang DESC
            `);

        const orders = ordersResult.recordset;

        // Fetch products for the seller
        const productsResult = await pool.request()
            .input('MaNguoiBan', sql.NChar, sellerId)
            .query(`
                SELECT MaSP, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa
                FROM SanPham
                WHERE MaNguoiBan = @MaNguoiBan
                ORDER BY TenSP
            `);

        const products = productsResult.recordset;

        res.render('sale_chanels', { title: 'Sale Channels', orders, products, seller: req.session.businessUser });
    } catch (err) {
        console.error('Error loading seller orders and products:', err);
        res.status(500).send('Error loading seller orders and products');
    }
}

module.exports = { loadOrderPaymentPage, loadPurchaseOrderStatusPage, placeOrder, loadSellerOrders };
