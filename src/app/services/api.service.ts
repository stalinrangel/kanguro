import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl="https://kangurodelivery.com/api/public/api";
  constructor(private http:HttpClient) { }

  pedido(id: any): Observable<any> {
    let url=this.apiUrl+'/auth/pedido/'+id;
    console.log(url)
    return this.http.get(url)
  }
  guia(id: any): Observable<any> {
    let url=this.apiUrl+'/guias/'+id;
    console.log(url)
    return this.http.get(url)
  }
  signin(model: any): Observable<any> {
    console.log(model)
    return this.http.post(this.apiUrl+'/auth/login', model)
  }
  signup(model: any): Observable<any> {
    console.log(model)
    return this.http.post(this.apiUrl+'/auth/signup', model)
  }
  reenviar(id): Observable<any> {
    console.log(id)
    return this.http.get(this.apiUrl+'/auth/enviar_validacion/'+id)
  }
  getuser(id): Observable<any> {
    console.log(id)
    return this.http.get(this.apiUrl+'/info_user/'+id)
  }
  update_user(id,data): Observable<any> {
    console.log(id)
    console.log(data)
    return this.http.put(this.apiUrl+'/update_user',data)
  }
  reset_password(email): Observable<any> {
    return this.http.post(this.apiUrl+'/auth/resetpassword/'+email,{})
  }
  estado(): Observable<any> {
    return this.http.get(this.apiUrl+'/pedido_con_productos')
  }
}
