import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-pedido-reprogramar-ecommerce',
  templateUrl: './pedido-reprogramar-ecommerce.component.html',
  styleUrls: ['./pedido-reprogramar-ecommerce.component.css']
})
export class PedidoReprogramarEcommerceComponent implements OnInit {


  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()+1};
  orders: any;
  order_select: any = {
    destino: ''
  }
  status: string = '';
  showWeb: boolean = false;

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
    //alert('d')
    let self = this;
    this.api.estado_reprogramado().subscribe({
      next(data){

        console.log(data);
        if (data.pedidos) {
          let p=[];
          for (let i = 0; i < data.pedidos.length; i++) {
            if (data.pedidos[i].estado_reprogramado==1) {
              //data.pedidos[i].fecha_destino = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() +1 };
              p.push(data.pedidos[i]);
            }
          }
          /*p.forEach(element => {
            element.destino = element.destinos[0].destino;
          });*/
          self.orders = p;
          console.log(self.orders)
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
    console.log(item)
    this.order_select = item;
    this.status = item.estado;
  }

  reprogramar(){
    console.log(this.order_select)
    let f= this.order_select.destinos[0].fecha_destino.year+'-'+this.order_select.destinos[0].fecha_destino.month+'-'+this.order_select.destinos[0].fecha_destino.day;
    this.order_select.destinos[0].fecha_destino=f;
    console.log(this.order_select)

    let pedido={
      estado: 0,
      estado_reprogramado: 0
    };
    this.api.update_pedidos(pedido,this.order_select.id).subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err.error.err);
      }
    })

    let destino={
      estado: 0,
      fecha_destino:f
    };
    this.api.update_destinos(destino,this.order_select.destinos[0].id).subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err.error.err);
      }
    })
    let self=this;
    setTimeout(() => {
      self.ngOnInit();
      self.status= '';
    }, 3000);
  }

}
