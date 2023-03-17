import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  public products: any = [];
  public user:any;
  public id:any;
  private order_select: any;
  private color_select: any;
  private atributo_select: any = {
    atributo: '',
    cantidad: ''
  }

  constructor(private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
    this.user=this.uss.user;
    this.id=this.user.user;
    this.init();
  }

  init(){
    let self = this;
    this.api.inventario(this.id.id).subscribe({
      next(data:any){
        self.products = data.productos;
        self.products.forEach(element => {
          element.cantidad = 0;
          element.colores.forEach(element1 => {
            element.imagen = 'https://www.kangurodelivery.com/Pedido/' + element1.imagen;
            element1.atributos.forEach(element2 => {
              element.cantidad = element.cantidad + element2.cantidad;
            });
          });
        });
        console.log(self.products);
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  addProduct(){
    this.router.navigate(['/addProducto']);
  }

  selectColor(item){
    this.color_select = item;
    item.colores.forEach(element => {
      element.atributos.forEach(element1 => {
        if (element.id == element1.color_id) {
          this.atributo_select = element1;
        }
      });
    });
  }

  open(content, type, item) {
    this.order_select = item;
    this.color_select = item.colores[0];
    console.log(this.color_select);
    this.color_select.atributos.forEach(element1 => {
      if (this.color_select.id == element1.color_id) {
        this.atributo_select = element1;
      }
    });
    console.log(this.atributo_select)
    if(type == 'view'){
      this.modalService.open(content, { windowClass: 'modal-add', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    }
  }

}
