import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent implements OnInit {
  public user:any;
  private id;
  public userData: any = {
    name: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: ''
  };
  public userDir: any = {
    direccion: '',
    piso: '',
    puerta: '',
    cp: '',
    estado: '',
    ciudad: '',
    contacto: ''
  };
  public userCard: any = {
    numero: '',
    titular: '',
    caducidad: '',
    cvc: '',
    check: ''
  };
  public userFav: any = {
    direccion: '',
    piso: '',
    puerta: '',
    cp: '',
    name: '',
    apellidos: '',
    dni: '',
    telefono: ''
  };
  showWeb: boolean = false;
  section: string = '1';
  sectionA: string = '1';
  sectionB: string = '1';

  orders: any = [];

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router, private sesion:SesionService) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
    console.log(this.uss)
    this.user=this.uss.user;
    console.log(this.user)
    this.id=this.user.user.id;
    console.log(this.id)
    this.getInfo();
    this.getEstado();
  }

  cerrar(){
    this.uss.destroy();
    this.sesion.emitirEvento();
    this.router.navigate(['/iniciar']);
  }

  getInfo(){
    let self = this;
    this.api.getuser(this.id).subscribe({
      next(data){
        if(data.users.length > 0){
          self.userData = data.users[0];
        }   
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  updateInfo(){
    let self = this;
    this.api.update_user(this.id, this.userData).subscribe({
      next(data){
        console.log(data)  
      },error(err){
        console.log(err.error);
      }
    })
  }

  getEstado(){
    let self = this;
    this.api.estado().subscribe({
      next(data){
        console.log(data);
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
          });
          self.orders = data.pedidos;
        }
      },error(err){
        console.log(err.error.err);
      }
    })
  }
}
