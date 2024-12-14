const express = require('express');
const router = express.Router();
const sql = require('mssql');

// ...existing code...

router.post('/add', async (req, res) => {
    const { productId, quantity, productPrice } = req.body;
    const userId = req.session.userId; // Assuming user ID is stored in session

    try {
        const request = new sql.Request();
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
});

module.exports = router;
