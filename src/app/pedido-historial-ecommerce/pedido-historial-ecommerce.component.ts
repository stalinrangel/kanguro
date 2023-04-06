import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedido-historial-ecommerce',
  templateUrl: './pedido-historial-ecommerce.component.html',
  styleUrls: ['./pedido-historial-ecommerce.component.scss']
})
export class PedidoHistorialEcommerceComponent implements OnInit {

  closeResult: string;
  orders: any = [];
  total_km: number = 0;
  total_costo: number = 0;
  date = new Date();
  model: NgbDateStruct;
  showWeb: boolean = false;
  order_selected = {
    id: null,
    destino: ''
  }

  constructor(private api: ApiService, private uss: UserStorageService, 
    private router: Router, private modalService: NgbModal, 
    private calendar: NgbCalendar, private cf: ChangeDetectorRef) { 
      var mediaqueryList = window.matchMedia("(min-width: 992px)");
      if(mediaqueryList.matches) {
        this.showWeb = true;
      }
  }


  ngOnInit(): void {
    this.model = this.calendar.getToday();
    console.log(this.model)
    let self = this;
    let date = this.model.year + '-' + this.model.month + '-' + this.model.day; 
    console.log(date)
    this.api.historial(date).subscribe({
      next(data){
        console.log(data);
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
            element.contacto = element.destinos[0].nombre_destino;
            element.telefono = element.destinos[0].telefono_destino;
            element.fecha_destino = element.destinos[0].fecha_destino;
            element.detalle = element.destinos[0].detalle;
            element.hora_destino = element.destinos[0].hora_destino;
            element.cantidad = element.destinos[0].cantidad;
            element.distrito_destino = element.destinos[0].distrito_destino;
            element.departamento_destino = element.destinos[0].departamento_destino;
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

  updateDay(ev){
    console.log(this.model)
    let self = this;
    let date = this.model.year + '-' + this.model.month + '-' + this.model.day; 
    console.log(date)
    this.api.historial(date).subscribe({
      next(data){
        console.log(data);
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
            element.contacto = element.destinos[0].nombre_destino;
            element.telefono = element.destinos[0].telefono_destino;
            element.fecha_destino = element.destinos[0].fecha_destino;
            element.detalle = element.destinos[0].detalle;
            element.hora_destino = element.destinos[0].hora_destino;
            element.cantidad = element.destinos[0].cantidad;
            element.distrito_destino = element.destinos[0].distrito_destino;
            element.departamento_destino = element.destinos[0].departamento_destino;
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

  changeOrder(item){
    this.order_selected = item;
    console.log(this.order_selected)
    this.cf.detectChanges();
  }

}
