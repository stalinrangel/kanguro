import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedido-historial',
  templateUrl: './pedido-historial.component.html',
  styleUrls: ['./pedido-historial.component.scss']
})
export class PedidoHistorialComponent implements OnInit {

  orders: any = [];
  total_km: number = 0;
  total_costo: number = 0;
  order_selected: any;

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router, private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    let self = this;
    this.api.estado().subscribe({
      next(data){
        console.log(data);
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
            element.contacto = element.destinos[0].nombre_destino;
            element.telefono = element.destinos[0].telefono_destino;
            self.total_km = self.total_km + Number(element.km);
            self.total_costo = self.total_costo + Number(element.costo);
          });
          self.orders = data.pedidos;
        }
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  open(content, type, item) {
    this.order_selected = item;
    if(type == 'detail'){
      this.modalService.open(content, { windowClass: 'modal-detail', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    } 
  }

}
