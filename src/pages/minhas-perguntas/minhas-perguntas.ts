import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { NovaPerguntaPage } from './../nova-pergunta/nova-pergunta';
import { Discussao } from './../../models/discussao';
import { Discussoes } from './../../providers/discussoes';
import { Usuarios } from './../../providers/usuarios';
import { DiscussaoPage } from './../discussao/discussao';

/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.1
 * Página com as perguntas criadas pelo usuário
 */
@Component({
  selector: 'page-minhas-perguntas',
  templateUrl: 'minhas-perguntas.html'
})
export class MinhasPerguntasPage {

  private discussoes: Promise<Discussao[]>;

  constructor(public navCtrl: NavController, private discProvider: Discussoes, private loadCtrl: LoadingController, private usuarios: Usuarios) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasPerguntasPage');

    //inicia loading
    let loading = this.loadCtrl.create({
      content: "Aguarde",
    });
    loading.present();

    this.discussoes = this.discProvider.getMinhasPerguntas(this.usuarios.Usuario.ID);

    this.discussoes.then(() => {
      loading.dismiss();
    });
  }

  /** Abre uma pergunta da lista */
  public abrirPergunta(discussao: Discussao) {
    this.navCtrl.push(DiscussaoPage, {discussao:discussao});
  }

  /** Leva para page de Nova Pergunt */
  public novaPergunta() {
    this.navCtrl.push(NovaPerguntaPage);
  }

}
