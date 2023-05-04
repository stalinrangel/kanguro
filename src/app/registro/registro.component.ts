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
    tipo_usuario:'1',
    almacen:0
  };
  private id:any;
  showWeb: boolean = false;
  public isDanger=false;

  constructor(
    private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router
  ) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
    this.tipo(1);
  }

  open(content, type) {
    console.log(type)
    //https://ng-bootstrap.github.io/#/components/modal/examples#options
    if(type == 'confirm'){
      this.modalService.open(content, { windowClass: 'modal-confirm', size: 'xl',centered: true, backdrop: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } 
  }
  openXl(content) {
		this.modalService.open(content, { windowClass: 'modal-confirm', size: 'xl',centered: true, backdrop: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {      
    });
	}

  danger(){
    this.isDanger=true;
    let self = this;
    setTimeout(() => {
      self.isDanger=false
    }, 3000);
  }

  tipo(val){
    this.type=val;
    this.model.tipo_usuario=val;
    if (val==3) {
      this.model.almacen=1;
    }else{
      this.model.almacen=0;
    }
    
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
        self.danger();
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
