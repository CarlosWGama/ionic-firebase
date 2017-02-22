import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { LoginPage } from './../pages/login/login';
import { MinhasPerguntasPage } from './../pages/minhas-perguntas/minhas-perguntas';
import { UltimasPerguntasPage } from './../pages/ultimas-perguntas/ultimas-perguntas';
import { NovaPerguntaPage } from './../pages/nova-pergunta/nova-pergunta';
import { DiscussaoPage } from './../pages/discussao/discussao';
import { MeusConselhosPage } from './../pages/meus-conselhos/meus-conselhos';

//Providers
import { Discussoes } from './../providers/discussoes';
import { Usuarios } from './../providers/usuarios';
import { Mensagens } from './../providers/mensagens';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MinhasPerguntasPage,
    UltimasPerguntasPage,
    NovaPerguntaPage,
    DiscussaoPage,
    MeusConselhosPage
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
    NovaPerguntaPage,
    DiscussaoPage,
    MeusConselhosPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Discussoes, Usuarios, Mensagens]
})
export class AppModule {}
