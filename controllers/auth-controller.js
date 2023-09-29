const bcrypt = require('bcryptjs');
const signingKey = require('../config/keys');
const generateToken = require('../helpers/generator-token');
const userRepository = require('../repositories/userRepository');
const User = require('../models/user');

let auth = (req, res) => {
    let email = req.body.email;
    let contraseña = req.body.contraseña;
    console.log('Email', email);
    console.log('contraseña', contraseña);
    const user = new User(email, contraseña);
    userRepository.Login(user, (user) => {
        if (!user) {
            res.status(401).json({ status: 'Unauthorized' });
            return;
        }

        let token = generateToken(
            user,
            signingKey.SIGNING_KEY_TOKEN,
            new Date().getTime() + 10 * 60 * 1000
        );

        let cookieConfig = {
            domain: 'localhost',
            path: '/refresh',
            secure: false,
            expires: new Date(Date.now() + 300000),
            httpOnly: true,
            signed: true,
        };

        return res
            .status(200)
            .cookie('refresh_token', email, cookieConfig)
            .json({
                status: 'Successful authentication',
                token: token,
            });
    });
};

module.exports = {
    auth,
};
