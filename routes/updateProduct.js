const express = require("express");
const productController = require('../controllers/product-controller');
const adminValidator  = require("../middleware/admin-validator");
const fullProductValidator = require("../middleware/full-product-validator");
const router = express.Router();


router.put('/', fullProductValidator.validatorParams, fullProductValidator.validator , adminValidator.adminValidator , productController.updateProduct);


module.exports = router; 