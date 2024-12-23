const { poolPromise, sql } = require('../db');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/review_uploads'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

async function addReview(req, res) {
    const { TenSP, MaDH, DiemDanhGia, NDDanhGia } = req.body;
    const MaUser = req.session.user.id;
    const HinhDanhGia = req.files['HinhDanhGia'] ? req.files['HinhDanhGia'][0].filename : null;
    const VideoDanhGia = req.files['VideoDanhGia'] ? req.files['VideoDanhGia'][0].filename : null;

    console.log('Received review data:', { TenSP, MaDH, MaUser, DiemDanhGia, NDDanhGia, HinhDanhGia, VideoDanhGia });

    if (!TenSP || !MaDH || !MaUser) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        const pool = await poolPromise;

        // Retrieve MaSP based on TenSP
        const productResult = await pool.request()
            .input('TenSP', sql.NVarChar(200), TenSP)
            .query(`
                SELECT MaSP
                FROM SanPham
                WHERE TenSP = @TenSP
            `);

        if (productResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        const MaSP = productResult.recordset[0].MaSP;

        // Check if a review already exists for the given MaDH, MaSP, and MaUser
        const existingReviewResult = await pool.request()
            .input('MaDH', sql.NChar(20), MaDH)
            .input('MaSP', sql.NChar(20), MaSP)
            .input('MaUser', sql.NChar(20), MaUser)
            .query(`
                SELECT COUNT(*) AS ReviewCount
                FROM DanhGiaSanPham
                WHERE MaDH = @MaDH AND MaSP = @MaSP AND MaUser = @MaUser
            `);

        const reviewCount = existingReviewResult.recordset[0].ReviewCount;

        if (reviewCount > 0) {
            return res.status(400).send('Review already exists for this order, product, and user.');
        }

        // Insert the new review
        await pool.request()
            .input('MaSP', sql.NChar(20), MaSP)
            .input('MaDH', sql.NChar(20), MaDH)
            .input('MaUser', sql.NChar(20), MaUser)
            .input('DiemDanhGia', sql.Int, DiemDanhGia)
            .input('NDDanhGia', sql.Text, NDDanhGia)
            .input('HinhDanhGia', sql.NVarChar(300), HinhDanhGia)
            .input('VideoDanhGia', sql.NVarChar(300), VideoDanhGia)
            .query(`
                INSERT INTO DanhGiaSanPham (MaSP, MaDH, MaUser, DiemDanhGia, NDDanhGia, HinhDanhGia, VideoDanhGia)
                VALUES (@MaSP, @MaDH, @MaUser, @DiemDanhGia, @NDDanhGia, @HinhDanhGia, @VideoDanhGia)
            `);

        res.json({ success: true });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ success: false, message: 'Error adding review', error: err.message });
    }
}

async function getReview(req, res) {
    const { orderId, productName } = req.query;
    const MaUser = req.session.user.id;

    try {
        const pool = await poolPromise;

        // Retrieve MaSP based on productName
        const productResult = await pool.request()
            .input('TenSP', sql.NVarChar(200), productName)
            .query(`
                SELECT MaSP
                FROM SanPham
                WHERE TenSP = @TenSP
            `);

        if (productResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        const MaSP = productResult.recordset[0].MaSP;

        // Retrieve the review
        const reviewResult = await pool.request()
            .input('MaDH', sql.NChar(20), orderId)
            .input('MaSP', sql.NChar(20), MaSP)
            .input('MaUser', sql.NChar(20), MaUser)
            .query(`
                SELECT DiemDanhGia, NDDanhGia, HinhDanhGia, VideoDanhGia
                FROM DanhGiaSanPham
                WHERE MaDH = @MaDH AND MaSP = @MaSP AND MaUser = @MaUser
            `);

        if (reviewResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }

        const review = reviewResult.recordset[0];
        res.json({ success: true, review });
    } catch (err) {
        console.error('Error fetching review:', err);
        res.status(500).json({ success: false, message: 'Error fetching review', error: err.message });
    }
}

module.exports = { addReview, getReview, upload };
