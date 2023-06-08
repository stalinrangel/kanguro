import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  public puede:boolean=false;

  constructor(
    private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router
  ) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
    this.tipo(3);
    this.getTypeStyles3();
  }

  open(content, type) {
    console.log(type)
    //content='<ng-template #confirm let-c="close" let-d="dismiss"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="d('+'Cross click'+')"><span aria-hidden="true" class="icon-delete">X</span></button></div><div class="modal-body"><img src="./assets/img/kanguro/logotipoblanco.svg" alt="" class="logotipo"> <p class="text-info">Te hemos enviado un correo electrónico para confirmar tu registro.</p><p class="text-info">No he recibido el correo, <span (click)="reenviar()">reenviar</span>.</p></div></ng-template>';
    
    if(type == 'confirm'){
      this.modalService.open(MyModalContentComponent, { windowClass: 'modal-confirm', size: 'xl',centered: true, backdrop: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } 
  }
  openXl(content) {
		this.modalService.open(MyModalContentComponent, { windowClass: 'modal-confirm', size: 'xl',centered: true, backdrop: true }).result.then((result) => {
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

  signup_ckeck(){
    let self = this;
    this.api.signup_ckeck(this.model).subscribe({
      next(data){
        if (data.status!='ok') {
          alert('Error este Email ya esta registrado!')
        }else{
          self.registro();
        }
      },error(err){
        console.log(err.error.err);
       
      }
    })
  }

  registro(){
    console.log(this.model.razon_social,this.model.email,this.model.password)
    if (this.model.razon_social=='' || this.model.email=='' || this.model.password=='') {
      alert('Debe completar los campos del registro.')
    }else{
      this.model.name=this.model.razon_social;
      console.log(this.model);
      let self = this;
      /*self.open('confirm', 'confirm')
          setTimeout(() => {
            self.modalService.dismissAll();
          }, 6000);*/
      this.api.signup(this.model).subscribe({
        next(data){
          //console.log(data);
          //alert('exito')
          //alert(JSON.stringify(data))
          self.uss.set(data);
          self.id=data.id;
          self.open('confirm', 'confirm')
          setTimeout(() => {
            self.modalService.dismissAll();
            self.router.navigate(['/iniciar']);
          }, 4000);
          
        },error(err){
          console.log(err.error.err);
          //alert('error')
          alert(JSON.stringify(err))
          self.danger();
        }
      })
    }
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

@Component({
  selector: 'app-my-modal-content',
  template: `
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" class="icon-delete">X</span>
      </button>
    </div>
    <div class="modal-body">
        <img src="./assets/img/kanguro/logotipoblanco.svg" alt="" class="logotipo"> 
        <p class="text-info">Te hemos enviado un correo electrónico para confirmar tu registro.</p>
        <p class="text-info">No he recibido el correo, <span>reenviar</span>.</p>
    </div>

  `
})
export class MyModalContentComponent {
  constructor(public modal: NgbActiveModal) {}
  
}
