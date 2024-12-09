const { poolPromise } = require('../db');

async function getProducts(page = 1, pageSize = 18) {
    try {
        const pool = await poolPromise;

        // Tính toán OFFSET cho phân trang
        const offset = (page - 1) * pageSize;

        // Truy vấn sản phẩm với OFFSET và LIMIT (FETCH NEXT)
        const query = `
            SELECT MaSP,MaNhomSP, TenSP, DGBanMacDinh, HinhChinh
            FROM SANPHAM
            ORDER BY MASP
            OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
        `;

        // Chạy truy vấn
        const result = await pool.request().query(query);

        return result.recordset;
    } catch (err) { 
        console.error('Error fetching products:', err);
        throw err;
    }
}

async function getTotalProducts() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT COUNT(*) AS TotalProducts FROM SANPHAM
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching total products:', err);
        throw err;
    }
}


module.exports = { getProducts, getTotalProducts };

