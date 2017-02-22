import { Mensagem } from './../models/mensagem';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Discussao } from './../models/discussao';

/**
 * @package Provider
 * @author Carlos W. Gama
 * @since 0.0.1
 * Provider de gerenciamento de Discussão
 */

 declare var firebase;

@Injectable()
export class Discussoes {
  
  private db: any;
 
  constructor() {
    this.db = firebase.database();
  }

  /** Busca as ultimas discussoes */
  public getUltimas(limite:number = 10): Promise<Discussao[]> {
    return this.db.ref('discussoes').limitToLast(limite).once('value').then(snapshot => {
      let discussoes: Array<Discussao> = [];
      if (snapshot.val() && Object.keys(snapshot.val()).length > 0) {
        
        Object.keys(snapshot.val()).forEach(key => {
          let disc = snapshot.val()[key];
          discussoes.push(Discussao.parseJSON(disc));
        });
      }
      return discussoes;
    });
  }

  /** Busca as ultimas discussoes que o usuário criou*/
  public getMinhasPerguntas(userID:string, limite:number = 10): Promise<Discussao[]> {
    return this.db.ref('usuarios-perguntas-criadas/' + userID).limitToLast(limite).once('value').then(snapshot => {
      let discussoes: Array<Discussao> = [];
      
      if (snapshot.val() && Object.keys(snapshot.val()).length > 0) {
        Object.keys(snapshot.val()).forEach(key => {
          let disc = snapshot.val()[key];
          discussoes.push(Discussao.parseJSON(disc));
        });
      }

      return discussoes;
    });
  }

  /** Busca as ultimas discussoes que usuário participou */
  public getUltimasParticipacoes(userID:string, limite:number = 10): Promise<Discussao[]> {
    return this.db.ref('usuarios-discussoes/' + userID).limitToLast(limite).once('value').then(snapshot => {
      let discussoes: Array<Discussao> = [];
    
      if (snapshot.val() && Object.keys(snapshot.val()).length > 0) {
        Object.keys(snapshot.val()).forEach(key => {
          let disc = snapshot.val()[key];
          discussoes.push(Discussao.parseJSON(disc));
        });
      }
      
      return discussoes;
    });
  }

  /** Cria uma discussão */
  public cadastrar(discussao: Discussao, mensagem: Mensagem): Discussao {
    let keyDiscussao = this.db.ref('discussoes').push().key;
    discussao.id = keyDiscussao;

    //Cria discussão
    this.db.ref('discussoes/' + keyDiscussao).set(discussao);

    //Faz referencia de quais discussões o usuário está presente
    this.db.ref('usuarios-discussoes/' + discussao.Criador.ID + '/' + keyDiscussao).set(discussao);

    //Faz referencia de quais discussões o usuári criou
    this.db.ref('usuarios-perguntas-criadas/' + discussao.Criador.ID + '/' + keyDiscussao).set(discussao);

    //Insere uma mensagem a discussão
    let keyMsg = this.db.ref('discussoes-mensagens/' + keyDiscussao).push().key;
    mensagem.discussaoID = keyDiscussao;
    mensagem.id = keyMsg;
    this.db.ref('discussoes-mensagens/' + keyDiscussao + '/' + keyMsg).set(mensagem);

    return discussao;
  }

}
