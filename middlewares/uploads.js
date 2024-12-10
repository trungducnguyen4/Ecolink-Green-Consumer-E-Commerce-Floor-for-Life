const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file trong thư mục public/GPKD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/GPKD'));
    },
    filename: function (req, file, cb) {
        // Đặt tên file dựa trên mã người bán (unique) hoặc timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `gpkd_${uniqueSuffix}${fileExtension}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Chỉ cho phép các định dạng ảnh
        const allowedFileTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file có định dạng JPEG, PNG hoặc PDF.'));
    },
});

module.exports = upload;
