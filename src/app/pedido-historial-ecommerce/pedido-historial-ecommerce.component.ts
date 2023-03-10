import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedido-historial-ecommerce',
  templateUrl: './pedido-historial-ecommerce.component.html',
  styleUrls: ['./pedido-historial-ecommerce.component.scss']
})
export class PedidoHistorialEcommerceComponent implements OnInit {

  closeResult: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content, type) {
    console.log(type)
    if(type == 'detail'){
      this.modalService.open(content, { windowClass: 'modal-detail', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } 
  }

}
