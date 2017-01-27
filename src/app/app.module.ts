import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { MinhasPerguntasPage } from './../pages/minhas-perguntas/minhas-perguntas';
import { Discussoes } from './../providers/discussoes';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    MinhasPerguntasPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    MinhasPerguntasPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Discussoes]
})
export class AppModule {}
