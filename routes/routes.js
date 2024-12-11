const express = require('express');
const router = express.Router();
//const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const { isAuthenticated } = require('../middlewares/auth');
const productController = require('../controllers/product_controller');
const loginController = require('../controllers/us_login_controller');
const signinController = require('../controllers/us_signin_controller');
const upload = require('../middlewares/uploads'); // Import middleware upload
const businessSigninController = require('../controllers/bs_signin_controller');
const businessLoginController = require('../controllers/bs_login_controller');

//products
router.get('/products', productController.getProductsPage);

router.get('/products/search', productController.searchProducts);
//product detail


router.get('/product-detail/:id', productController.getProductDetail);


//Trang chủ
router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

//Đăng nhập đăng ký
router.get("/us-log-in", (req, res) => {
    res.render("us-log-in", { title: "Log-in" });
});
// Route đăng nhập cho người dùng
router.post('/us-login/user', loginController.loginUser);

router.get("/us-sign-in", (req, res) => {
    res.render("us-sign-in", { title: "Sign-in" });
});

// Route đăng ký người dùng (nếu cần)
router.post('/us-sign-in/user', signinController.createUser);

router.get("/business-login", (req, res) => {
    res.render("business-login", { title: "Business Log-in" });
});

// Route đăng nhập cho người bán
router.post('/business-login/user', businessLoginController.loginBusiness);

router.get("/business-signin", (req, res) => {
    res.render("business-signin", { title: "Business Sign-in" });
});

// Route đăng ký doanh nghiệp
router.post('/business-signin/user', upload.single('GiayPhepKD'), businessSigninController.registerBusiness);

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

router.get("/personal", (req, res) => {
    res.render("personal", { title: "Personal" });
});

router.get("/personal_forum", (req, res) => {
    res.render("personal_forum", { title: "Personal forum" });
});

router.get("/test", (req, res) => {
    res.render("test", { title: "Test" });
});

router.get("/cart", (req, res) => {
    res.render("cart", { title: "Cart" });
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

// Route thử nghiệm
router.get('/test-view', (req, res) => {
    res.render('error', { message: 'Đây là trang thử nghiệm lỗi.' });
});


//test đăng nhập
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
    // Lưu trạng thái người dùng trước khi hủy session
    const isBusinessUser = req.session?.businessUser;

    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi xóa session:', err);
            return res.status(500).send('Đã xảy ra lỗi khi đăng xuất');
        }
        // Chuyển hướng đến trang đăng nhập tương ứng
        res.redirect(isBusinessUser ? '/business-login' : '/us-log-in');
    });
});



// Route được bảo vệ
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.status(200).send(`Chào mừng ${req.session.user.TenDangNhap} đến trang dashboard`);
});


router.get('/business-dashboard', isAuthenticated, (req, res) => {
    res.status(200).send(`Chào mừng ${req.session.businessUser.TenDangNhap} đến trang dashboard`);
});


module.exports = router;