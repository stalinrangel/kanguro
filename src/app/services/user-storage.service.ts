import { Injectable } from '@angular/core';
//import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private key: string="ng-auth";

  constructor() { }

  get acces_token(): string {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser= JSON.parse(user);
      return objUser.token;
    }
    return null;
  }

  get user(): string {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser= JSON.parse(user);
      return objUser;
    }
    return null;
  }

  get isAuth():boolean {
    let user = localStorage.getItem(this.key);
    return user !== null;
  }

  set(object):void{
    console.log(object)
    localStorage.setItem(
      this.key,
      JSON.stringify(object)
    );
  }

  destroy(): void{
    localStorage.removeItem(this.key);
  }

  set_value(key,object):void{
    console.log(object)
    localStorage.setItem(
      key,
      JSON.stringify(object)
    );
  }
  destroy_value(key): void{
    localStorage.removeItem(key);
  }

  get_value(key) {
    let user = localStorage.getItem(key);

    if (user) {
      let objUser= JSON.parse(user);
      return objUser;
    }
    return null;
  }

  set_envio(key,object):void{
    console.log(key,object)
    localStorage.setItem(key,object)
  }
  get_envio(key){
    let envio=localStorage.getItem(key);
    if (envio) {
      let data = JSON.parse(envio);
      return data;
    }
    return null;
  }
}
