import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NovaPerguntaPage } from './../nova-pergunta/nova-pergunta';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UltimasPerguntasPage');
  }

  /** Leva para page de Nova Pergunt */
  public novaPergunta() {
    this.navCtrl.push(NovaPerguntaPage);
  }

}
