const mysql = require('mysql2');
const User = require('../models/user');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TiendaVirtual',
});

connection.connect();

class userRepository {
    static Login(user, callback) {
        connection.query(
            'SELECT * FROM USUARIO WHERE email = ? AND contraseña = ?',
            [user.email, user.contraseña],
            (error, results) => {
                if (error) throw error;

                if (results.length > 0) {
                    const userData = results[0];
                    const user = new User(
                        userData.email,
                        userData.contraseña,
                        userData.rol
                    );
                    callback(user);
                } else {
                    callback(null);
                }
            }
        );
    }

    static Register(user, callback) {
        connection.query(
            'INSERT INTO USUARIO (email, contraseña, rol) VALUES (?, ?, ?)',
            [user.email, user.contraseña, user.rol],
            (error) => {
                if (error) {
                    callback(true);
                }else {
                    callback();
                }
            }
        );
    }

    static ShowUserInfo(email, callback){
        connection.query(
            'SELECT * FROM USUARIO WHERE email = ?',
            [email],
            (error, results) => {
                if (error) {
                    return callback(null, error)
                };

                if (results.length > 0) {
                    const userData = results[0];
                    const user = new User(
                        userData.email,
                        userData.contraseña,
                        userData.rol
                    );
                    callback(user);
                } else {
                    callback(null);
                }
            }
        );
    }
}

module.exports = userRepository;
