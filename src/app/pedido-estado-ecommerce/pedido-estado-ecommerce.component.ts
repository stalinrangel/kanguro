import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-estado-ecommerce',
  templateUrl: './pedido-estado-ecommerce.component.html',
  styleUrls: ['./pedido-estado-ecommerce.component.scss']
})
export class PedidoEstadoEcommerceComponent implements OnInit, AfterViewInit {

  orders: any;
  order_select: any = {
    destino: ''
  }
  status: string = '0';
  showWeb: boolean = false;

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
    let self = this;
    this.api.estado().subscribe({
      next(data){
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
            element.contacto = element.destinos[0].nombre_destino;
            element.telefono = element.destinos[0].telefono_destino;
            element.fecha_destino = element.destinos[0].fecha_destino;
            element.hora_destino = element.destinos[0].hora_destino;
          });
          self.orders = data.pedidos;
        }
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  ngAfterViewInit(): void {
    document.querySelector('.select-wrapper').addEventListener('click', function() {
      this.querySelector('.select').classList.toggle('open');
    })
  }

  changeOrder(item){
    this.order_select = item;
    this.status = item.estado;
  }

}
