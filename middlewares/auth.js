function isAuthenticated(req, res, next) {
    if (req.session && (req.session.user || req.session.businessUser)) {
        return next(); // Nếu session hợp lệ, tiếp tục
    }
    res.status(401).send('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
}


module.exports = { isAuthenticated };
