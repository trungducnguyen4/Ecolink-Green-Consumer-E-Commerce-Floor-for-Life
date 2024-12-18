// controllers/productController.js
const adminModel = require('../models/admin_model');

async function getAdminPage(req, res) {
    try {
        const admin = await adminModel.getBlog();
        res.render('admin', { admin });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}
  
module.exports = { getAdminPage };

