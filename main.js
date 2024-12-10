
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 4000;


// Import và kết nối cơ sở dữ liệu
const db = require('./db'); // Đảm bảo kết nối được thiết lập

// Cấu hình view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Cấu hình session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 30 * 60 * 1000
     }  // Set secure: true nếu sử dụng HTTPS
}));



// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng các route đã định nghĩa
app.use('/', routes);


// Khởi động server sau khi kết nối DB thành công
db.poolPromise
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    });
