require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const routes = require('./routes/routes');
const path = require('path');

const forumRoutes = require('./routes/forum_routes'); 
const adminRoutes = require('./routes/admin_routes');
const newsRoutes = require('./routes/news_routes'); 
const newsDetailRoutes = require('./routes/newsDetail_routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Import và kết nối cơ sở dữ liệu
const db = require('./db'); // Đảm bảo kết nối được thiết lập

// Cấu hình view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));



// Cấu hình middleware để phục vụ tệp trong thư mục upload
app.use('/upload', express.static(__dirname + '/upload'));



// Cấu hình session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        
     }  // Set secure: true nếu sử dụng HTTPS
}));

// Middleware xử lý session cho tất cả các view
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng các route đã định nghĩa
app.use('/', routes);
// Đăng ký các router
app.use('/forum', forumRoutes);  
app.use('/admin', adminRoutes); 
app.use('/api', forumRoutes);  
app.use('/news', newsRoutes);  

app.use('/news-detail', newsDetailRoutes);  


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
