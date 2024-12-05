const express = require('express');
const router = express.Router();
//const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');

router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});


router.get("/products", (req, res) => {
    res.render("products", { title: "Products" });
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

router.get("/test", (req, res) => {
    res.render("test", { title: "Test" });
});


module.exports = router;