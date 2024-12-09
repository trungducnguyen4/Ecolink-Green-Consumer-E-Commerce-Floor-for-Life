const express = require('express');
const router = express.Router();
//const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');
const productController = require('../controllers/product_controller');



router.get('/products', productController.getProductsPage);





router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});


router.get("/log-in", (req, res) => {
    res.render("log-in", { title: "Log-in" });
});

router.get("/business_log-in", (req, res) => {
    res.render("business_log-in", { title: "Business Log-in" });
});

router.get("/product-detail", (req, res) => {
    res.render("product-detail", { title: "Product detail" });
});

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

module.exports = router;