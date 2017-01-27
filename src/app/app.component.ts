import { MinhasPerguntasPage } from './../pages/minhas-perguntas/minhas-perguntas';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, NavOptions } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  pages: { page: any, titulo: string, icon: string }[] = [
    { page: MinhasPerguntasPage, titulo: "Minhas Perguntas", icon: "help"},
    { page: HomePage, titulo: "Meus conselhos", icon: "ios-heart-outline"},
    { page: HomePage, titulo: "Discuta", icon: "ios-megaphone-outline"},
  ];

  // Navegação 
  @ViewChild("content") navCtrl: NavController;
  navOptions: NavOptions = {animate: true, animation: 'wp-transition', direction: 'forward', duration: 2000}

  constructor(platform: Platform, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.menuCtrl.enable(false);
    });
  }

  /**
   * Troca entre as diferentes páginas
   */
  menuTrocaPage(page: any) {
    this.navCtrl.setRoot(page, null, this.navOptions)
  }

  /**
   * Realiza o Logout do APP
   */
  menuLogout() {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot(LoginPage, null, this.navOptions)
  }

 
}
