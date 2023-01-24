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
}
