const express = require("express");
const productController = require('../controllers/product-controller');
const  adminValidator  = require("../middleware/admin-validator");
const productValidator = require("../middleware/product-validator");
const router = express.Router();


router.post('/', productValidator.validatorParams, productValidator.validator , adminValidator.adminValidator , productController.addProduct);


module.exports = router; 