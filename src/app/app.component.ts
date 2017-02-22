import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, NavOptions } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from './../pages/login/login';
import { UltimasPerguntasPage } from './../pages/ultimas-perguntas/ultimas-perguntas';
import { Usuarios } from './../providers/usuarios';
import { Usuario } from './../models/usuario';
import { MeusConselhosPage } from './../pages/meus-conselhos/meus-conselhos';
import { MinhasPerguntasPage } from './../pages/minhas-perguntas/minhas-perguntas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  usuario: Usuario = new Usuario();
  rootPage = null;
  pages: { page: any, titulo: string, icon: string }[] = [
    { page: UltimasPerguntasPage, titulo: "Ultimas Perguntas", icon: "ios-megaphone-outline" },
    { page: MinhasPerguntasPage, titulo: "Minhas Perguntas", icon: "help"},
    { page: MeusConselhosPage, titulo: "Meus conselhos", icon: "ios-heart-outline"}
  ];

  // Navegação 
  @ViewChild("content") navCtrl: NavController;
  navOptions: NavOptions = {animate: true, animation: 'wp-transition', direction: 'forward', duration: 2000}

  constructor(platform: Platform, public menuCtrl: MenuController, private usuarios: Usuarios) {
    platform.ready().then(() => {

     if (this.usuarios.Usuario != null) {
        this.usuario = this.usuarios.Usuario;
        this.menuCtrl.enable(true);
        this.rootPage = UltimasPerguntasPage;
      } else {
        this.rootPage = LoginPage;
        this.menuCtrl.enable(false);
      }

      //Atualiza após login
      this.usuarios.Auth.onAuthStateChanged(user => {
        if (user) this.usuario = this.usuarios.Usuario;
      });


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  /**
   * Troca entre as diferentes páginas
   */
  menuTrocaPage(page: any) {
    this.navCtrl.setRoot(page)
  }

  /**
   * Realiza o Logout do APP
   */
  menuLogout() {
    this.usuarios.deslogar();
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot(LoginPage, null, this.navOptions)
  }

 
}
