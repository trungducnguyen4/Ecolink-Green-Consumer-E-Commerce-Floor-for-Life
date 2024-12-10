function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // Nếu session còn hiệu lực, tiếp tục
    }
    res.status(401).send('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
}


module.exports = { isAuthenticated };
