import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { NovaPerguntaPage } from './../nova-pergunta/nova-pergunta';
import { Discussao } from './../../models/discussao';
import { Discussoes } from './../../providers/discussoes';

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

  constructor(public navCtrl: NavController, private discProvider: Discussoes, private loadCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasPerguntasPage');

    //inicia loading
    let loading = this.loadCtrl.create({
      content: "Aguarde",
    });
    loading.present();

    this.discussoes = this.discProvider.getDiscussaoUsuario('asdasda');

    this.discussoes.then(() => {
      loading.dismiss();
    });
  }

  /** Leva para page de Nova Pergunt */
  public novaPergunta() {
    this.navCtrl.push(NovaPerguntaPage);
  }

}
