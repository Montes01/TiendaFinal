const mysql = require("mysql2");
const Product = require('../models/product');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'TiendaVirtual'
});

connection.connect();

class ventaRepository {
    static comprarProducto (venta, callback) {
        connection.query(
            'INSERT INTO VENTA (fkEmail, fkId, cantidad) VALUES (?, ?, ?)',
            [venta.userEmail, venta.productId, venta.cantidad],
            (error, results) => {
                if (error) return callback(error);
                callback();
            }
        );
        }
}

module.exports = ventaRepository;
