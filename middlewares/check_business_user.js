// middleware/checkBusinessUser.js
function checkBusinessUser(req, res, next) {
    if (req.session.businessUser) {
        return next(); // Nếu là business user, cho phép tiếp tục
    } else {
        res.status(403).render('error', { message: 'Bạn không có quyền truy cập vào trang này.' });
    }
}

module.exports = {checkBusinessUser};
