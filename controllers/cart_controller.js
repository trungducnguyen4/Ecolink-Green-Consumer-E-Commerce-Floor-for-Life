const { poolPromise } = require('../db');
const sql = require('mssql');

async function getCartItems(req, res) {
    console.log('Session Data:', req.session); // Debugging statement to print session data

    if (!req.session.user) {
        console.error('User not logged in');
        return res.status(401).send('User not logged in');
    }

    let userId = req.session.user.id.toString(); // Convert id to string
    userId = userId.padEnd(20, ' '); // Pad the userId to match nchar(20)
    console.log('User ID:', userId); // Debugging statement to print user ID

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaUser', sql.NChar, userId)
            .query(`
                SELECT sp.MaSP, sp.TenSP, sp.HinhChinh, sp.DGBanMacDinh, sp.SoLuongTon, stg.SoLuongSPTrongGio
                FROM SanPhamTrongGio stg
                JOIN SanPham sp ON stg.MaSP = sp.MaSP
                WHERE stg.MaUser = @MaUser
            `);

        const cartItems = result.recordset; // Ensure cartItems is defined
        console.log('Cart Items:', cartItems); // Debugging statement
        cartItems.forEach(item => console.log('Image Path:', item.HinhChinh)); // Debugging statement for image paths
        res.render('cart', { title: 'Cart', cartItems });
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Error fetching cart items');
    }
}

async function updateCartItemQuantity(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.session.user.id.toString().padEnd(20, ' '); // Pad the userId to match nchar(20)

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('MaUser', sql.NChar, userId)
            .input('MaSP', sql.NChar, productId)
            .input('SoLuongSPTrongGio', sql.Int, quantity)
            .query(`
                UPDATE SanPhamTrongGio
                SET SoLuongSPTrongGio = @SoLuongSPTrongGio
                WHERE MaUser = @MaUser AND MaSP = @MaSP
            `);

        res.json({ success: true });
    } catch (err) {
        console.error('Error updating cart item quantity:', err);
        res.status(500).json({ success: false, error: 'Error updating cart item quantity' });
    }
}

async function addToCart(req, res) {
    const { productId, quantity, productPrice } = req.body;
    const userId = req.session.user.id.toString().padEnd(20, ' '); // Pad the userId to match nchar(20)

    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('MaUser', sql.NChar, userId);
        request.input('MaSP', sql.NChar, productId);
        request.input('SoLuong', sql.Int, quantity);
        request.input('ProductPrice', sql.Decimal(10, 2), productPrice);

        await request.execute('AddToCart');

        res.json({ success: true });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.json({ success: false, message: 'Error adding to cart', error: error.message });
    }
}

module.exports = { getCartItems, updateCartItemQuantity, addToCart };