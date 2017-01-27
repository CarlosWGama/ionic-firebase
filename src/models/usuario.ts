/**
 * @author Carlos W. Gama
 * @since 0.0.1
 * @package Model
 * Classe Modelo de Usuários
 */

export class Usuario {

    constructor(private id, private nome) {

    }

    get ID(): string { return this.id; }
    get Nome(): string { return this.nome; }
}