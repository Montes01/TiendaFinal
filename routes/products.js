const express = require("express");
const productController = require('../controllers/product-controller');
const router = express.Router();
const authToken = require('../middleware/auth-token');

router.get('/', authToken.njwtAuth , productController.getProducts);


module.exports = router; 