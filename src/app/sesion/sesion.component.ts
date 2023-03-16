import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  closeResult: string;
  public email:any='';
  public password:any='';
  public model:any={
    email:this.email,
    password:this.password
  };

  constructor(private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  open(content, type) {
    console.log(type)
    if(type == 'confirm'){
      this.modalService.open(content, { windowClass: 'modal-confirm', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } 
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

  recuperar(){

    console.log(this.model);
    let self = this;
    this.api.reset_password(this.model.email).subscribe({
      next(data){
        //console.log(data);
       alert('Enviado!')
          
      },error(err){
        console.log(err.error.err);
        alert('Error!')
      }
    })
  }
}
