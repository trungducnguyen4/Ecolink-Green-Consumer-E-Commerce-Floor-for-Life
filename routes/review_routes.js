const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');

router.post('/add-review', reviewController.upload.fields([
    { name: 'HinhDanhGia', maxCount: 1 },
    { name: 'VideoDanhGia', maxCount: 1 }
]), reviewController.addReview);

module.exports = router;
