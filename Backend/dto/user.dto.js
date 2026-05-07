export class CreateDTO {
    constructor({email,nombre, password,rolId}){
        this.email = email
        this.nombre = nombre
        this.password = password
        this.rolId = Number(rolId)
    }
}