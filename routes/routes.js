const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const { isAuthenticated } = require('../middlewares/auth');
const productController = require('../controllers/product_controller');
const loginController = require('../controllers/us_login_controller');
const signinController = require('../controllers/us_signin_controller');
const upload = require('../middlewares/uploads'); // Import middleware upload
const businessSigninController = require('../controllers/bs_signin_controller');
const businessLoginController = require('../controllers/bs_login_controller');
const cartController = require('../controllers/cart_controller');  // Thêm cartController từ nhánh main
const homeController = require('../controllers/home_controller'); // Thêm homeController từ nhánh KogMin
const checkBusinessUser = require('../middlewares/check_business_user');
const personalController = require('../controllers/personal_controller');

// Initialize session middleware
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Cart routes
router.post('/cart/add', cartController.addToCart);
router.get('/cart', isAuthenticated, cartController.getCartItems);
router.post('/cart/update-quantity', isAuthenticated, cartController.updateCartItemQuantity);

// Products routes
router.get('/products', productController.getProductsPage);
router.get('/products/search', productController.searchProducts);
router.get('/products/filter', productController.getProductsPage);
router.get('/product-detail/:id', productController.getProductDetail);

// Trang chủ
router.get("/", homeController.getHomePage);  // Trang chủ sử dụng homeController

// Các route khác
router.get("/us-log-in", (req, res) => {
    res.render("us-log-in", { title: "Log-in" });
});
router.post('/us-login/user', loginController.loginUser);

router.get("/us-sign-in", (req, res) => {
    res.render("us-sign-in", { title: "Sign-in" });
});
router.post('/us-sign-in/user', signinController.createUser);

router.get("/business-login", (req, res) => {
    res.render("business-login", { title: "Business Log-in" });
});
router.post('/business-login/user', businessLoginController.loginBusiness);

router.get("/business-signin", (req, res) => {
    res.render("business-signin", { title: "Business Sign-in" });
});
router.post('/business-signin/user', upload.single('GiayPhepKD'), businessSigninController.registerBusiness);

// Các route khác
router.get("/news", (req, res) => {
    res.render("news", { title: "News" });
});

router.get("/news-detail", (req, res) => {
    res.render("news-detail", { title: "News detail" });
});

router.get("/forum", (req, res) => {
    res.render("forum", { title: "Forum" });
});

router.get("/log-in", (req, res) => {
    res.render("log-in", { title: "Login" });
});

// Hiển thị trang cá nhân
router.get('/personal', isAuthenticated, personalController.getPersonalInfo);

// Cập nhật thông tin cá nhân
router.post('/personal/updatePersonal', isAuthenticated, personalController.upload.single('Avatar'), personalController.updatePersonalInfo);

router.get("/personal_forum", (req, res) => {
    res.render("personal_forum", { title: "Personal forum" });
});

router.get("/test", (req, res) => {
    res.render("test", { title: "Test" });
});

router.get("/order-payment", (req, res) => {
    res.render("order-payment", { title: "Order payment" });
});

router.get("/purchaseOrderStatus", (req, res) => {
    res.render("purchaseOrderStatus", { title: "purchaseOrderStatus" });
});

router.get("/sale-chanels", (req, res) => {
    res.render("sale_chanels", { title: "Sale chanels" });
});

// Trang thêm sản phẩm
router.get('/add-product', (req, res) => {
    if (!req.session.businessUser) {
        return res.status(403).send('Chỉ Business User mới có quyền thêm sản phẩm.');
    }

    const businessUser = req.session.businessUser;
    res.render('add-product', { businessUser });
});

// Route POST xử lý form thêm sản phẩm
router.post('/add-product', checkBusinessUser.checkBusinessUser, productController.upload.single('HinhChinh'), productController.addProduct);

// Route thử nghiệm
router.get('/test-view', (req, res) => {
    res.render('error', { message: 'Đây là trang thử nghiệm lỗi.' });
});

// Test login
router.get('/check-session', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).send(`Bạn đang đăng nhập với tài khoản: ${req.session.user.TenDangNhap}`);
    } else {
        res.status(401).send('Bạn chưa đăng nhập');
    }
});

router.get('/check-business-session', (req, res) => {
    if (req.session && req.session.businessUser) {
        const businessAccount = req.session.businessUser.TenDangNhap;
        res.status(200).send(`Doanh nghiệp đang đăng nhập với tài khoản: ${businessAccount}`);
    } else {
        res.status(401).send('Bạn chưa đăng nhập với tài khoản doanh nghiệp.');
    }
});

router.get('/logout', (req, res) => {
    const isBusinessUser = req.session?.businessUser;

    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi xóa session:', err);
            return res.status(500).send('Đã xảy ra lỗi khi đăng xuất');
        }
        res.redirect(isBusinessUser ? '/business-login' : '/us-log-in');
    });
});

// Protected routes
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.status(200).send(`Chào mừng ${req.session.user.TenDangNhap} đến trang dashboard`);
});

router.get('/business-dashboard', isAuthenticated, (req, res) => {
    res.status(200).send(`Chào mừng ${req.session.businessUser.TenDangNhap} đến trang dashboard`);
});

module.exports = router;
