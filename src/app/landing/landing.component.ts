import { ViewportScroller } from '@angular/common';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  public id:any='';
  pedido:any='';
  public pedidos:any=[];
  mostrar=false;
  closeResult: string;
  constructor(private viewportScroller: ViewportScroller, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {}

  public navigateToSection(id,section: string) {
    console.log(id)
    this.pedidos=[];
    this.mostrar=false;
    let self=this;
    this.api.pedido(this.id).subscribe({
      next(data){
        self.pedidos=data;
        self.pedidos.tamano=self.pedidos.lenght;
        console.log(self.pedidos);
        self.construir(section);
      },error(err){
        console.log(err);
      }
    })
  }

  construir(section){
    //this.pedidos=[];
    /*let estado0='Pedido recibido';
    let estado1='Pedido asignado a repartidor';
    let estado2='Pedido en camino';
    let estado3='Pedido en entregado';

    if (this.pedido.estado=="0") {
      this.pedidos.push(this.pedido);
      setTimeout(() => {
        this.pedidos[0].nestado=estado0;
      }, 100);
      
    }else if (this.pedido.estado=="1") {
      this.pedidos.push(this.pedido);this.pedidos.push(this.pedido);
      setTimeout(() => {
        this.pedidos[0].nestado=estado0;
        this.pedidos[1].nestado=estado1;
      }, 100);
      
    }else if (this.pedido.estado=="2") {
      let p0=this.pedido;
      p0.nestado=estado0;
      this.pedidos.push(p0);
      console.log(this.pedidos);
      setTimeout(() => {
        let p1=this.pedido;
        p1.nestado=estado1;
        this.pedidos.push(p1);
      }, 10050);
      setTimeout(() => {
        let p2=this.pedido;
        p2.nestado=estado2;
        this.pedidos.push(p2);
      }, 20700);
      
    }else if (this.pedido.estado=="3") {
      this.pedidos.push(this.pedido);this.pedidos.push(this.pedido);this.pedidos.push(this.pedido);this.pedidos.push(this.pedido);
      setTimeout(() => {
        this.pedidos[0].nestado=estado0;
        this.pedidos[1].nestado=estado1;
        this.pedidos[2].nestado=estado2;
        this.pedidos[4].nestado=estado3;
      }, 100);
      
    }else if (this.pedido.estado=="4") {
      this.pedidos(this.pedido);
      this.pedidos[0].nestado='Pedido en cancelado';
    }
    */
    setTimeout(() => {
      console.log(section)
      this.mostrar=true;
      this.viewportScroller.scrollToAnchor(section);
    }, 500);
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

}
