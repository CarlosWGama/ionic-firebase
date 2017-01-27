import { Usuario } from './usuario';
/**
 * @author Carlos W. Gama
 * @since 0.0.1
 * @package Model
 * Classe Modelo de Discussões
 */

export class Discussao {

    constructor(private id: string = "", private titulo: string, private criador: Usuario, private dataCriacao: Date) {

    }

    get ID(): string { return this.id; }
    get Titulo(): string { return this.titulo; }
    get Criador(): Usuario { return this.criador; }
    get DataCriacao(): Date { return this.dataCriacao; }
    get Descricao(): string { return "hoje eu estava..." }
}