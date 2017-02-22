import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Discussao } from './../../models/discussao';
import { Mensagem } from './../../models/mensagem';
import { Mensagens } from './../../providers/mensagens';
import { Usuario } from './../../models/usuario';
import { Usuarios } from './../../providers/usuarios';

/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.2
 * Página que lista a conversa da discussão
 */
@Component({
  selector: 'page-discussao',
  templateUrl: 'discussao.html'
})
export class DiscussaoPage {

  @ViewChild('content')
  private content;
  private discussao: Discussao = null;
  private mensagens: Observable<Mensagem[]> = null;
  private texto: string = "";
  private usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController, private msgProvider: Mensagens, private usuarioProvider: Usuarios) {
    this.discussao = this.navParams.get("discussao") as Discussao;
  }

  ionViewDidLoad() {
    this.usuario = this.usuarioProvider.Usuario;

    let loading = this.loadCtrl.create({
      content: "Aguarde"
    });
    loading.present();
    
    this.mensagens = new Observable<Mensagem[]>((observer) => {
      let mensagens: Mensagem[] = [];
      this.msgProvider.acompanharDiscussao(this.discussao.id).on('child_added', (snapshot) => {

        mensagens.push(Mensagem.parseJSON(snapshot.val()));
        observer.next(mensagens);
        
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 300);
      });
    });

    loading.dismiss();


  }

  public getLado(mensagem: Mensagem) {
    return (mensagem.Criador.ID == this.usuario.ID ? "left" : "right");
  }

  public enviarMensagem() {
    let mensagem = new Mensagem("", this.discussao.id, this.usuario, this.texto);
    this.msgProvider.cadastrar(this.discussao, mensagem);
    this.texto = "";
  }

}
