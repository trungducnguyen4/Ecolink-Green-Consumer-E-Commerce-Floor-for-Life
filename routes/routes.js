const express = require('express');
const router = express.Router();
//const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');

router.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});
module.exports = router;