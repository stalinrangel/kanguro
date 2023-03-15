import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  closeResult: string;
  public type:any=0;
  public model:any={
    razon_social:'',
    name:'',
    email:'',
    password:'',
    tipo_usuario:'1'
  };
  private id:any;

  constructor(
    private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router
  ) { }

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
  tipo(val){
    this.type=val;
    this.model.tipo_usuario=val;
    
  }
  getTypeStyles1() {
    if (this.type=='1') {
      return 'color: red; border-bottom: 1px solid red';
    }else {
      return 'color: black; border-bottom: 0px';
    }
  }
  getTypeStyles3() {
    if (this.type=='3') {
      return 'color: red; border-bottom: 1px solid red';
    }else {
      return 'color: black; border-bottom: 0px';
    }
  }

  registro(){
    this.model.name=this.model.razon_social;
    console.log(this.model);
    let self = this;
    this.api.signup(this.model).subscribe({
      next(data){
        //console.log(data);
        self.uss.set(data);
        self.id=data.id;
        self.router.navigate(['/iniciar']);
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  reenviar(){
    console.log(this.id);
    let self = this;
    this.api.reenviar(this.id).subscribe({
      next(data){
        console.log(data);
        alert('Enviado, revise la bandeja de spam');
      },error(err){
        console.log(err.error.err);
      }
    })
  }
}
