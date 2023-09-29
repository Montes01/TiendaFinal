const Product = require('../models/product');
const ProductRepository = require('../repositories/productRepository');

let getProducts = (req, res) => {
    ProductRepository.getAllProducts((products) => {
        res.status(200).json(products);
    });
};
let addProduct = (req, res) => {
    const nombre = req.body.nombre;
    const precio = req.body.precio;

    const product = new Product(null, nombre, precio);
    ProductRepository.addProduct(product, (err) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Error al agregar el producto' });
        res.status(200).json({ message: 'Producto agregado correctamente' });
    });
};

let updateProduct = (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const product = new Product(id, nombre, precio);
    ProductRepository.updateProduct(product, (err) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Error al actualizar el producto' });
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    });
}

let deleteProduct = (req, res) => {
    const id = req.query.id;
    ProductRepository.deleteProduct(id, (err) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Error al eliminar el producto' });
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    });
}
module.exports = {
    updateProduct,
    getProducts,
    deleteProduct,
    addProduct,
};
