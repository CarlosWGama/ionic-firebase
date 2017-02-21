import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map';

import { Usuario } from './../models/usuario';

/**
 * @package Provider
 * @author Carlos W. Gama
 * @since 0.0.1
 * Provider de gerenciamento de usuários
 */
declare var firebase;

@Injectable()
export class Usuarios {

  private auth;

  constructor() {
    this.auth = firebase.auth();
  }

  /** Busca o autenticador */
  get Auth() { return this.auth; }

  /** Retorna usuário logado */
  get Usuario(): Usuario {
    if (this.auth.currentUser) {
      return new Usuario(this.auth.currentUser.uid, this.auth.currentUser.email, this.auth.currentUser.displayName);
    } 
    return null;
  }

  /** Cadastra um novo usuário */
  public cadastrar(usuario: Usuario): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  /** Tenta realizar o login do usuário */
  public logar(usuario: Usuario): Promise<any> {
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  } 

  /** Mensagem de erro ao cadastrar */
  public erroCadastro(erro: any): string {
    let msg:string = "";
    switch(erro.code) {
      case 'auth/email-already-in-use':   msg = 'Conta já em uso'; break;
      case 'auth/invalid-email':          msg = 'E-mail inválido'; break;
      case 'auth/operation-not-allowed':  msg = 'Cheque novamente o e-mail ou senha'; break;
      case 'auth/weak-password':          msg = 'Senha muito fraca'; break;
      default:                            msg = erro.message;
    }
    return msg;
  }

  /** Mensagem de erro ao logar */
  public erroLogin(erro: any): string {
    let msg:string = "";
    switch(erro.code) {
      case 'auth/invalid-email': msg = 'Email inválido'; break;
      case 'auth/user-disabled': msg = 'Esse usuário foi desabilitado'; break;
      case 'auth/user-not-found': msg = 'Usuário não encontrado'; break;
      case 'auth/wrong-password': msg = 'Senha incorreta'; break
    }
    return msg;
  }

  /** Desloga o usuário */
  public deslogar(): void{
    this.auth.signOut(); 
  }

}
