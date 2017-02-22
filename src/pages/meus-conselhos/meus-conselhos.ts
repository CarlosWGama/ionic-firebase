import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { NovaPerguntaPage } from './../nova-pergunta/nova-pergunta';
import { DiscussaoPage } from './../discussao/discussao';
import { Usuarios } from './../../providers/usuarios';
import { Discussoes } from './../../providers/discussoes';
import { Discussao } from './../../models/discussao';
/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.2
 * Página que lista as perguntas onde você conselhou
 */
@Component({
  selector: 'page-meus-conselhos',
  templateUrl: 'meus-conselhos.html'
})
export class MeusConselhosPage {

   private discussoes: Promise<Discussao[]> = null;

  constructor(public navCtrl: NavController, private discProvider: Discussoes, private loadCtrl: LoadingController, private usuarios: Usuarios) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasPerguntasPage');

    //inicia loading
    let loading = this.loadCtrl.create({
      content: "Aguarde",
    });
    loading.present();

    this.discussoes = this.discProvider.getUltimasParticipacoes(this.usuarios.Usuario.ID);
 
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
