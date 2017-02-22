import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
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
export class DiscussaoPage implements OnInit {

  @ViewChild('content')
  private content;
  private discussao: Discussao = null;
  private mensagens: Observable<Mensagem[]> = null;
  private texto: string = "";
  private usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController, private msgProvider: Mensagens,
              private usuarioProvider: Usuarios, private ngZone: NgZone) {
    this.discussao = this.navParams.get("discussao") as Discussao;
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.usuario = this.usuarioProvider.Usuario;

    this.loadCtrl.create({
      content: "Aguarde",
      duration: 1000
    }).present();
    
    this.mensagens = new Observable<Mensagem[]>((observer) => {
      let mensagens: Mensagem[] = [];
      this.msgProvider.acompanharDiscussao(this.discussao.id).on('child_added', (snapshot) => {

        mensagens.push(Mensagem.parseJSON(snapshot.val()));
        
        //Arruma bug de não exibir o conteúo na tela
        this.ngZone.run(() => {
          //Atualiza conteúdo arrumando o bug
          observer.next(mensagens);

          //Anda após adicionar item
          setTimeout(() => {
            if (this.content != null) 
              this.content.scrollToBottom(300);
  
          }, 300);
        });

      });
    });
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
