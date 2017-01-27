import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavOptions, MenuController } from 'ionic-angular';

/**
 * @package Pages
 * @author Carlos W. Gama
 * @since 0.0.1
 * Página do Login
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  cadastrar: boolean = true;
  private navOptions: NavOptions = { animate: true, animation: 'md-transition', direction: 'forward' }

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Altera o tipo de ação da tela
   */
  alterarBotoes(realizarCadastro: boolean) {
    this.cadastrar = realizarCadastro;
  }

  /**
   * Realiza o cadastro do usuário
   */
  cadastro() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(HomePage, this.navOptions);
  }

  /**
   * Realiza o login do usuário
   */
  login() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(HomePage, this.navOptions);
  }

}
