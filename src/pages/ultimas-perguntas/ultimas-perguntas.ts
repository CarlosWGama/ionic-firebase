import { DiscussaoPage } from './../discussao/discussao';
import { Discussao } from './../../models/discussao';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { NovaPerguntaPage } from './../nova-pergunta/nova-pergunta';
import { Usuarios } from './../../providers/usuarios';
import { Discussoes } from './../../providers/discussoes';
/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.2
 * Página que lista ultimas perguntas
 */
@Component({
  selector: 'page-ultimas-perguntas',
  templateUrl: 'ultimas-perguntas.html'
})
export class UltimasPerguntasPage {

  private discussoes: Promise<Discussao[]> = null;

  constructor(public navCtrl: NavController, private discProvider: Discussoes, private loadCtrl: LoadingController, private usuarios: Usuarios) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasPerguntasPage');

    //inicia loading
    let loading = this.loadCtrl.create({
      content: "Aguarde",
    });
    loading.present();

    this.discussoes = this.discProvider.getUltimas();
 
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
