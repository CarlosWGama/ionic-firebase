import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Discussao } from './../models/discussao';

/**
 * @package Provider
 * @author Carlos W. Gama
 * @since 0.0.1
 * Provider de gerenciamento de Discussão
 */
@Injectable()
export class Discussoes {

  constructor(public http: Http) {
    console.log('Hello Discussao Provider');
  }

  public getDiscussaoUsuario(userID: string): Promise<Discussao[]> {
    return new Promise(resolve => {
      
      let usuario = new Usuario('asdasd', 'Anonimo');
      let usuario2 = new Usuario('asdasd', 'Luz');
      let usuario3 = new Usuario('asdasd', 'My');

      setTimeout(() =>{
          resolve([
          new Discussao('qeqweqw', usuario, 'Não sei o que fazer mais', new Date("2017-01-26T00:00:00")),
          new Discussao('qeqweqw', usuario2, 'Help!!', new Date("2017-01-26T00:00:00")),
          new Discussao('qeqweqw', usuario3, 'Preciso de ajuda', new Date("2017-01-26T00:00:00"))
        ]);
      }, 2000);
      
    });
  }

}
