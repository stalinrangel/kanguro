import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-reprogramar-ecommerce',
  templateUrl: './pedido-reprogramar-ecommerce.component.html',
  styleUrls: ['./pedido-reprogramar-ecommerce.component.css']
})
export class PedidoReprogramarEcommerceComponent implements OnInit {

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
        console.log(data);
        if (data.pedidos) {
          data.pedidos.forEach(element => {
            element.destino = element.destinos[0].destino;
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
