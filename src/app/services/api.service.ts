import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl="https://kangurodelivery.com/api_bar/public/api";
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
  estado_reprogramado(): Observable<any> {
    return this.http.get(this.apiUrl+'/pedido_con_productos')
  }
  historial(date): Observable<any> {
    return this.http.get(this.apiUrl+'/pedido_historial?fecha_destino='+date)
  }
  fecha(){
    return this.http.get(this.apiUrl+'/auth/getHour')
  }
  inventario(id){
    return this.http.get(this.apiUrl+'/inventario/'+id)
  }
  add_producto(data): Observable<any> {
    return this.http.post(this.apiUrl+'/producto/store',data)
  }
  add_color(data): Observable<any> {
    return this.http.post(this.apiUrl+'/color/store',data)
  }
  add_atributo(data): Observable<any> {
    return this.http.post(this.apiUrl+'/atributo/store',data)
  }
  subir_imagen(data): Observable<any> {
    return this.http.post('https://www.kangurodelivery.com/Pedido/php/subirImagenProducto.php',data)
  }
  crear_pedido(data): Observable<any> {
    return this.http.post(this.apiUrl+'/pedido/store',data)
  }
  crear_pedido_ecommerce(data): Observable<any> {
    return this.http.post(this.apiUrl+'/pedido2/store',data)
  }
  crear_destino(data): Observable<any> {
    return this.http.post(this.apiUrl+'/destino/store',data)
  }
  guias(id): Observable<any>{
    return this.http.get(this.apiUrl+'/guias_ecommerce/'+id)
  }
  guias_productos(id): Observable<any>{
    return this.http.get(this.apiUrl+'/producto_guia/'+id)
  }
  crear_guia(data): Observable<any> {
    return this.http.post(this.apiUrl+'/guias/store',data)
  }
  signup_ckeck(data): Observable<any> {
    return this.http.post(this.apiUrl+'/auth/signup_check',data)
  }
  update_pedidos(data,id): Observable<any> {
    return this.http.put(this.apiUrl+'/update_pedidos/'+id,data)
  }
  update_destinos(data,id): Observable<any> {
    return this.http.put(this.apiUrl+'/update_destinos/'+id,data)
  }
  contacto(data): Observable<any> {
    return this.http.post(this.apiUrl+'/auth/contacto',data)
  }

}
