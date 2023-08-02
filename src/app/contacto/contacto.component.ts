import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  showWeb: boolean = false;
  nombre='';
  email='';
  mensaje='';
  closeResult: string;
  public isDanger=false;
  constructor(private api: ApiService, private modalService: NgbModal) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }
  ngOnInit(): void {
  }

  enviar(){
    if (this.nombre!='' && this.email!='' && this.mensaje!='') {
      console.log(this.nombre,this.email,this.mensaje)
      let data={
        nombre:this.nombre,
        email:this.email,
        mensaje:this.mensaje
      }
      let self=this;
      this.api.contacto(data).subscribe({
        next(data){
          console.log(data);
          self.nombre='';
          self.email='';
          self.mensaje='';
          self.open('confirm', 'confirm')
          setTimeout(() => {
            self.modalService.dismissAll();
            //self.router.navigate(['/iniciar']);
          }, 4000);
          
        },error(err){
          console.log(err);
          //alert('error')
          //alert(JSON.stringify(err))
          self.danger();
        }
      })
    }else{
      alert('Por favor, complete los campos.')
    }
  }

  danger(){
    this.isDanger=true;
    let self = this;
    setTimeout(() => {
      self.isDanger=false
    }, 3000);
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
        <p class="text-info">¡Gracias por contactarnos!.</p>
    </div>

  `
})
export class MyModalContentComponent {
  constructor(public modal: NgbActiveModal) {}
  
}