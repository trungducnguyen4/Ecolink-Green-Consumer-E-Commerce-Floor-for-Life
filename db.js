// db.js
const sql = require('mssql');

const sqlConfig = {
    server: 'localhost', // Địa chỉ máy chủ
    database: 'NCKH',
    user: 'trungduc1407', // Tên người dùng SQL Server
    password: '14072004az', // Mật khẩu
    options: {
      encrypt: true,  // Thường dùng cho kết nối an toàn
      trustServerCertificate: true  // Chỉ cần nếu bạn đang sử dụng kết nối không an toàn
    }
  };
  

  // const sqlConfig = {
  //   server: 'localhost', // Địa chỉ máy chủ
  //   database: 'NCKH',
  //   user: 'manager1', // Tên người dùng SQL Server
  //   password: '123', // Mật khẩu
  //   options: {
  //     encrypt: true,  // Thường dùng cho kết nối an toàn
  //     trustServerCertificate: true  // Chỉ cần nếu bạn đang sử dụng kết nối không an toàn
  //   }
  // };


//   const sqlConfig = {
//     server: 'localhost',
//     port: 1433, // Cổng mặc định cho SQL Server
//     database: 'NCKH',
//     user: 'sa',
//     password: 'Albert Einstein',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true, // Bắt buộc nếu không có chứng chỉ SSL
//     },
// };


// Tạo một kết nối pool và xuất nó để sử dụng trong các module khác
const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    });

module.exports = {
    sql,
    poolPromise
};
