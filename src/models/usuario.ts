/**
 * @author Carlos W. Gama
 * @since 0.0.1
 * @package Model
 * Classe Modelo de Usuários
 */

export class Usuario {

    constructor(private id?: string, public email: string = "", public nome: string = "", public senha: string = "") {

    }

    get ID(): string { return this.id; }
}