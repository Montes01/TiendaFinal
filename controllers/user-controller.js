const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const User = require('../models/user');
const nJwt = require('njwt');
const config = require('../config/keys');

let register = (req, res) => {
    let email = req.body.email;
    let contraseña = req.body.contraseña;
    const user = new User(email, contraseña);
    userRepository.Register(user, (error) => {
        if (error) {
            res.status(500).json({ message: 'Error al registrar usuario' });
            return;
        }
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
};

let showInfo = (req, res) => {
    let token = req.header('Authorization').split(' ')[1];
    nJwt.verify(token, config.SIGNING_KEY_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(400).send({ auth: false, message: err });
        }
        userRepository.ShowUserInfo(decoded.body.email, (user, error) => {
            if (error) {
                res.status(500).json({ message: 'Error al mostrar usuario' });
                return;
            }
            res.status(200).json({ data: user });
        });
    });
};

module.exports = {
    register,
    showInfo
};
