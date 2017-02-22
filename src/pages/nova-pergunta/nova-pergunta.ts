import { DiscussaoPage } from './../discussao/discussao';
import { Mensagem } from './../../models/mensagem';
import { Usuarios } from './../../providers/usuarios';
import { Discussoes } from './../../providers/discussoes';
import { Discussao } from './../../models/discussao';
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

  constructor(public navCtrl: NavController,  private discussoes: Discussoes, private usuarios: Usuarios) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPerguntaPage');
  }

  public criarPergunta() {
    let usuario = this.usuarios.Usuario;
    let discussao = new Discussao("", usuario, this.titulo);
    let mensagem = new Mensagem("", "", usuario, this.mensagem);
    discussao = this.discussoes.cadastrar(discussao, mensagem);
    this.navCtrl.setRoot(DiscussaoPage, {discussao: discussao});
  }

}
