class User {
    constructor (email, contraseña, rol = "USER"){
        this.email = email;
        this.contraseña = contraseña;
        this.rol = rol;
    }
}

module.exports = User;