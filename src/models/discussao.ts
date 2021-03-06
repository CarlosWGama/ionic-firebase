import { Usuario } from './usuario';
import * as moment from 'moment';
import 'moment/locale/pt-br';

/**
 * @author Carlos W. Gama
 * @since 0.0.1
 * @package Model
 * Classe Modelo de Discussões
 */

export class Discussao {

    constructor(public id: string = "", private criador: Usuario, private titulo: string, private dataCriacao: string = null) {
        if (this.dataCriacao == null) {
            moment.locale('pt-BR');
            this.dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        }

    }

    get Titulo(): string { return this.titulo; }
    get Criador(): Usuario { return this.criador; }
    get DataCriacao(): string { return moment(this.dataCriacao).format('DD/MM/YYYY HH:MM'); }

    public static parseJSON(json: any) {
        let usuario = new Usuario(json.criador.id, "", json.criador.nome);
        return new Discussao(json.id, usuario, json.titulo, json.dataCriacao);
    }
}