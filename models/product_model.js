const { poolPromise } = require('../db');
const sql = require('mssql'); 

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



async function searchProducts(keyword, page = 1, pageSize = 18) {
    try {
        const pool = await poolPromise;

        // Tính toán OFFSET cho phân trang
        const offset = (page - 1) * pageSize;

        // Thêm dấu % vào keyword trước khi gửi vào SQL
        const searchKeyword = `%${keyword}%`;

        // Truy vấn tìm kiếm sản phẩm với keyword
        const query = `
            SELECT *
            FROM SANPHAM
            WHERE TenSP LIKE @keyword
            ORDER BY MASP
            OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY;
        `;
        
        const result = await pool.request()
            .input('keyword', sql.NVarChar, searchKeyword)
            .input('offset', sql.Int, offset)
            .input('pageSize', sql.Int, pageSize)
            .query(query);

        // Kiểm tra nếu không có kết quả
        if (result.recordset.length === 0) {
            return [];  // Nếu không có sản phẩm, trả về mảng trống
        }

        return result.recordset;  // Trả về danh sách sản phẩm tìm thấy
    } catch (err) {
        console.error('Error fetching products by search:', err);
        throw err;
    }
}


async function getTotalProductsByKeyword(keyword) {
    try {
        const pool = await poolPromise;

        // Thêm dấu % vào keyword trước khi gửi vào SQL
        const searchKeyword = `%${keyword}%`;

        // Truy vấn tổng số sản phẩm thỏa mãn từ khóa tìm kiếm
        const query = `
            SELECT COUNT(*) AS TotalProducts
            FROM SANPHAM
            WHERE TenSP LIKE @keyword;
        `;

        const result = await pool.request()
            .input('keyword', sql.NVarChar, searchKeyword)  // Thêm dấu % vào keyword
            .query(query);

        // Kiểm tra nếu không có kết quả
        if (result.recordset.length === 0) {
            return 0;  // Nếu không có sản phẩm, trả về 0
        }

        return result.recordset[0].TotalProducts;  // Trả về tổng số sản phẩm
    } catch (err) {
        console.error('Error fetching total products by search:', err);
        throw err;
    }
}



module.exports= {getProducts, getTotalProducts,getTotalProductsByKeyword,searchProducts};