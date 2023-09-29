const express = require("express");
const productController = require('../controllers/product-controller');
const userController = require('../controllers/user-controller');
const router = express.Router();
const authToken = require('../middleware/auth-token');


router.get('/', authToken.njwtAuth, userController.showInfo);


module.exports = router; 