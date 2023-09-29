const nJwt = require('njwt');
const config = require('../config/keys');

let adminValidator = (req, res, next) => {
    if (!req.header('Authorization')) {
        return res
            .status(403)
            .send({ auth: false, message: 'No token provided' });
    }
    let sub = req.header('Authorization').split(' ');
    let token = sub[1];
    console.log('TOKEN', token);
    nJwt.verify(token, config.SIGNING_KEY_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(400).send({ auth: false, message: err });
        } else if (decoded.body.rol !== 'ADMIN') {
            return res
                .status(403)
                .send({
                    auth: false,
                    message: 'No tienes permisos para realizar esta acción',
                });
        } else {
            next();
        }
    });
};

module.exports = {
    adminValidator,
};
