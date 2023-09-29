const express = require("express");
const productController = require('../controllers/product-controller');
const adminValidator  = require("../middleware/admin-validator");
const router = express.Router();


router.delete('/', adminValidator.adminValidator , productController.deleteProduct);


module.exports = router; 