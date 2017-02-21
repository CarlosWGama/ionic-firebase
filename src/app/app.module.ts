import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { LoginPage } from './../pages/login/login';
import { MinhasPerguntasPage } from './../pages/minhas-perguntas/minhas-perguntas';
import { UltimasPerguntasPage } from './../pages/ultimas-perguntas/ultimas-perguntas';
import { NovaPerguntaPage } from './../pages/nova-pergunta/nova-pergunta';

//Providers
import { Discussoes } from './../providers/discussoes';
import { Usuarios } from './../providers/usuarios';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MinhasPerguntasPage,
    UltimasPerguntasPage,
    NovaPerguntaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MinhasPerguntasPage,
    UltimasPerguntasPage,
    NovaPerguntaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Discussoes, Usuarios]
})
export class AppModule {}
