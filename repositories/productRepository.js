const mysql = require("mysql2");
const Product = require('../models/product');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'TiendaVirtual'
});

connection.connect();

class ProductRepository {
  // Obtener todos los productos
  static getAllProducts(callback) {
    connection.query('SELECT * FROM PRODUCTO', (error, results) => {
      if (error) throw error;

      const products = results.map(row => new Product(row.id, row.nombre, row.precio));
      callback(products);
    });
  }

  // Obtener un producto por ID
  static getProductById(id, callback) {
    connection.query('SELECT * FROM PRODUCTO WHERE id = ?', [id], (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        const productData = results[0];
        const product = new Product(productData.id, productData.nombre, productData.precio);
        callback(product);
      } else {
        callback(null);
      }
    });
  }

  // Agregar un nuevo producto
  static addProduct(product, callback) {
    connection.query('INSERT INTO PRODUCTO (nombre, precio) VALUES (?, ?)', [product.nombre, product.precio], (error, results) => {
      if (error) throw error;
      callback();
    });
  }

  // Actualizar un producto
  static updateProduct(product, callback) {
    connection.query('UPDATE PRODUCTO SET nombre = ?, precio = ? WHERE id = ?', [product.nombre, product.precio, product.id], (error) => {
      if (error) return callback(error);

      callback();
    });
  }

  // Eliminar un producto
  static deleteProduct(id, callback) {
    connection.query('DELETE FROM PRODUCTO WHERE id = ?', [id], (error) => {
      if (error) return callback(error);

      callback();
    });
  }
}

module.exports = ProductRepository;
