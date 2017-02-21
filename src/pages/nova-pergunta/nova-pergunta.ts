import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.2
 * Página que inicia uma pergunta
 */
@Component({
  selector: 'page-nova-pergunta',
  templateUrl: 'nova-pergunta.html'
})
export class NovaPerguntaPage {

  titulo: string = "";
  mensagem: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPerguntaPage');
  }

}
