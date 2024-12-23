const { poolPromise, sql } = require('../db');

async function getHomePage(req, res) {
    try {
        const pool = await poolPromise;

        // Lấy sản phẩm thuộc nhóm thực phẩm
        const productsTPResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'TP')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsTP = productsTPResult.recordset;

        // Lấy sản phẩm thuộc nhóm văn phòng phẩm
        const productsVPPResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'VPP')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsVPP = productsVPPResult.recordset;

        // Lấy sản phẩm thuộc nhóm gia dụng
        const productsGDResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'GD')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsGD = productsGDResult.recordset;

        // Lấy sản phẩm thuộc nhóm Chăm sóc cá nhân
        const productsCSCNResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'CSCN')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsCSCN = productsCSCNResult.recordset;

        // Lấy sản phẩm thuộc nhóm mỹ phẩm
        const productsMPResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'MP')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsMP = productsMPResult.recordset;

        

        // Lấy sản phẩm thuộc nhóm đồ uốn
        const productsDUResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'DU')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsDU = productsDUResult.recordset;

        

        // Lấy sản phẩm thuộc nhóm đồ uốn
        const productsKhacResult = await pool.request()
            .input('MaNhomSP', sql.NChar(20), 'Khac')
            .query(`
                SELECT MaSP, TenSP, DGBanMacDinh, HinhChinh
                FROM SanPham
                WHERE MaNhomSP = @MaNhomSP
                ORDER BY NEWID()
            `);

        const productsKhac = productsKhacResult.recordset;

        // Render trang home với danh sách sản phẩm
        res.render('home', { productsTP,productsVPP,productsGD,productsCSCN,productsMP,productsDU,productsKhac });
    } catch (err) {
        console.error('Error in getHomePage:', err);
        res.status(500).render('error', { message: 'Lỗi khi tải trang chủ.' });
    }
}

module.exports = { getHomePage };
