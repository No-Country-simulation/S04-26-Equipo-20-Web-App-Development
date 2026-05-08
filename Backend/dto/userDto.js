export default class UserDTO {
    constructor({nombre,email, password,rol}){
        if(typeof password !=="string"){
            throw new Error("El password debe ser un string y no un numero")
        }
        if(typeof nombre !=="string"){
            throw new Error("El nombre debe ser un string y no un numero")
        }
        this.nombre = nombre
        this.email = email
        this.password = password
        this.rol = rol
    }
}