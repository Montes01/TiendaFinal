const Venta = require('../models/venta');
const ventaRepository = require('../repositories/ventaRepository');
const nJwt = require('njwt');
const config = require('../config/keys');
const emailSender = require('../helpers/email-sender');


let comprarProducto = (req, res) => {
    let productId = req.body.productId;
    let cantidad = req.body.cantidad;
    let venta = new Venta(userEmail, productId, cantidad);
    let token = req.header('Authorization').split(' ')[1];
        nJwt.verify(token, config.SIGNING_KEY_TOKEN, function (err, decoded) {
            if (err) {
                return res.status(400).send({ auth: false, message: err });
            }
            venta.userEmail = decoded.body.email;
        });
    ventaRepository.comprarProducto(venta, (err) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Error al comprar el producto' });
        emailSender(venta.userEmail, 'Compra realizada con éxito', 'Acabas de comprar un producto y la compra fue exitosa');
        res.status(200).json({ message: 'Producto comprado correctamente' });
    });
};
module.exports = {
    comprarProducto,
};
