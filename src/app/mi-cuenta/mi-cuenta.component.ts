import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
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

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router, private sesion:SesionService) { }

  ngOnInit(): void {
    console.log(this.uss)
    this.user=this.uss.user;
    console.log(this.user)
    this.id=this.user.user.id;
    console.log(this.id)
    this.getInfo();
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
}
