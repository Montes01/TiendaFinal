const express = require("express");
const ventaController = require('../controllers/venta-controller');
const ventaValidator = require("../middleware/sale-validator");
const authToken = require('../middleware/auth-token');
const router = express.Router();


router.post('/', authToken.njwtAuth ,ventaValidator.validatorParams, ventaValidator.validator , ventaController.comprarProducto);


module.exports = router; 