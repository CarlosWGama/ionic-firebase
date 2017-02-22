import { Discussao } from './../models/discussao';
import { Injectable } from '@angular/core';

import { Mensagem } from './../models/mensagem';

/** 
 * @package Provider
 * @author Carlos W. Gama
 * @since 0.0.1
 * Gerencia as mensagens
*/
declare var firebase;
@Injectable()
export class Mensagens {

  private db;

  constructor() {
    this.db = firebase.database();
  }

  /** Recupera as mensagens de uma discussao */
  public getMensagens(discID: string, limite: number = 20): Promise<Mensagem[]> {
    return this.db.ref('discussoes-mensagens/' + discID).limitToLast(limite).once('value').then((snapshot) => {
      let mensagens: Array<Mensagem> = [];

      if (snapshot.val() && Object.keys(snapshot.val()).length > 0) {
        Object.keys(snapshot.val()).forEach(key => {
          let msg = snapshot.val()[key];
          mensagens.push(Mensagem.parseJSON(msg));
        });
      }

      return mensagens;
    });
  }

  /** Acompanhar as mensagens enviadas em uma discussão */
  public acompanharDiscussao(discID: string): any {
    return this.db.ref('discussoes-mensagens/' + discID);
  }

  /** Cadastra uma mensagem em uma discussão */
  public cadastrar(discussao: Discussao, mensagem: Mensagem) {    
    
    //Faz referencia de quais discussões o usuário está presente
    this.db.ref('usuarios-discussoes/' + mensagem.Criador.ID + '/' + discussao.id).set(discussao);

    //Insere uma mensagem a discussão
    let keyMsg = this.db.ref('discussoes-mensagens/' + discussao.id).push().key;
    mensagem.id = keyMsg;
    this.db.ref('discussoes-mensagens/' + discussao.id + "/" + keyMsg).set(mensagem);
  }

}
