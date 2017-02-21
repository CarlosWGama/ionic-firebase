import { Component } from '@angular/core';
import { NavController, NavOptions, MenuController, AlertController } from 'ionic-angular';


import { UltimasPerguntasPage } from './../ultimas-perguntas/ultimas-perguntas';
import { Usuario } from './../../models/usuario';
import { Usuarios } from './../../providers/usuarios';
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

  private cadastrar: boolean = false;
  private usuario: Usuario = new Usuario();
  private navOptions: NavOptions = {animate: true, animation: 'wp-transition', direction: 'forward', duration: 2000}

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private alertCtrl: AlertController, private usuarios: Usuarios) {}

  ionViewDidLoad() {
    this.usuarios.Auth.onAuthStateChanged(user => {
      if (user) {
        if (this.cadastrar) {
          user.updateProfile({
            displayName: this.usuario.nome
          }).then(function() {
            console.log("Atualizado");
          }, function(error) {
            console.log("Erro");
          });
        }

        //Redireciona para Home
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(UltimasPerguntasPage, null, this.navOptions);
      }
    });
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

    if (!this.usuario.nome) {
      // Exibe a mensagem de erro 
      this.alertCtrl.create({
        title: 'Erro :(',
        message: 'Informe um nome fictício',
        buttons: [{ text: 'Ok', role: 'cancel' }]
      }).present();

      return;
    } 

    this.usuarios.cadastrar(this.usuario).catch(erro => {
      let msgErro = this.usuarios.erroCadastro(erro);

      // Exibe a mensagem de erro 
      this.alertCtrl.create({
        title: 'Erro :(',
        message: msgErro,
        buttons: [{ text: 'Ok', role: 'cancel' }]
      }).present();
    });
  }

  /**
   * Realiza o login do usuário
   */
  login() {
    this.usuarios.logar(this.usuario).catch(erro => {
      let msgErro = this.usuarios.erroLogin(erro);

      // Exibe a mensagem de erro 
      this.alertCtrl.create({
        title: 'Erro :(',
        message: msgErro,
        buttons: [{ text: 'Ok', role: 'cancel' }]
      }).present();
    });
  }

}
