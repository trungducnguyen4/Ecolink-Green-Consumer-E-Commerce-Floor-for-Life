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
    res.render("product-detail", { title: "Products" });
});
router.get("/news", (req, res) => {
    res.render("news", { title: "news" });
});
router.get("/forum", (req, res) => {
    res.render("forum", { title: "Forum" });
});
module.exports = router;