import { Usuario } from './usuario';
import * as moment from 'moment';
import 'moment/locale/pt-br';

/**
 * @author Carlos W. Gama
 * @since 0.0.1
 * @package Model
 * Classe Modelo de Mensagens
 */

export class Mensagem {

    constructor(public id: string = "", public discussaoID: string = '',  private criador: Usuario, private mensagem: string, private dataCriacao: string = null) {
        if (this.dataCriacao == null) {
            moment.locale('pt-BR');
            this.dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        }
    }

    get Mensagem(): string { return this.mensagem; }
    get Criador(): Usuario { return this.criador; }
    get DataCriacao(): string { return moment(this.dataCriacao).format('DD/MM/YYYY HH:MM'); }

    public static parseJSON(json: any) {
        let usuario = new Usuario(json.criador.id, "", json.criador.nome);
        return new Mensagem(json.id, json.discusssaoID, usuario, json.mensagem, json.dataCriacao);
    }
}