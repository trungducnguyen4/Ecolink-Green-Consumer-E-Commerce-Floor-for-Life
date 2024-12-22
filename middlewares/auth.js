function isAuthenticated(req, res, next) {
    if (req.session && (req.session.user || req.session.businessUser)) {
        return next(); // Nếu session hợp lệ, tiếp tục
    }
    res.redirect('/us-log-in'); // Chuyển hướng đến trang đăng nhập
}

module.exports = { isAuthenticated };