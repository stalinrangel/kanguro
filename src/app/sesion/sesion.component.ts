import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  public email:any='';
  public password:any='';
  public model:any={
    email:this.email,
    password:this.password
  };

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){

    console.log(this.model);
    let self = this;
    this.api.signin(this.model).subscribe({
      next(data){
        //console.log(data);
        self.uss.set(data);
        setTimeout(() => {
          console.log(data.user.tipo_usuario)
          if (data.user.tipo_usuario==3) {
            self.router.navigate(['/pedidoEcommerce']);
          }else{
            self.router.navigate(['/pedido']);
          }
          
          
        }, 800);
      },error(err){
        console.log(err.error.err);
      }
    })
  }
}
