import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

  user;
  guias;
  order_select={
    cliente:"",
    estado:1,
    fecha:"",
    id:59,
    productos:JSON.parse("[{\"id\":2,\"cantidad\":\"23\",\"producto\":{\"id\":2,\"producto\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2336\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2031\"},{\"id\":1,\"cantidad\":\"25\",\"producto\":{\"id\":1,\"producto\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2335\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2350\"}]"),
    productos1:JSON.parse("[{\"id\":2,\"cantidad\":\"23\",\"producto\":{\"id\":2,\"producto\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2336\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2031\"},{\"id\":1,\"cantidad\":\"25\",\"producto\":{\"id\":1,\"producto\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2335\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2350\"}]"),
    receptor: "Kanguro",
    remitente: "",
    guia:''
  };
  receptor="Kanguro";
  remitente;
  productos:any=[{
    id:'',
    cantidad:0,
    productos:[],
    nombre:''
  }];
  cliente;
  fecha;
  selec_productos=[];
  guia;
  mostrar=false;
  closeResult: string;
  model: NgbDateStruct;
  
  constructor(private modalService: NgbModal, private uss:UserStorageService,private api: ApiService,private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.user=this.uss.user;
    this.user=this.user.user;
    console.log(this.user)

    let self=this;
    this.api.guias(this.user.id).subscribe({
      next(data){
        console.log(data);
        self.guias=data.guias.reverse();
      },error(err){
        console.log(err);
      }
    })
  }

  gui(){
    let self=this;
    this.api.guias(this.user.id).subscribe({
      next(data){
        console.log(data);
        self.guias=data.guias.reverse();
      },error(err){
        console.log(err);
      }
    })
  }

  changeOrder(item){
    this.order_select = item;
    this.order_select.productos1=JSON.parse(this.order_select.productos)
    //this.status = item.estado;
    console.log(item)
    this.mostrar=true;
  }

  open(content, type) {
    console.log(type)
    if(type == 'payment'){
      this.modalService.open(content, { windowClass: 'modal-payment', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    }
    let self=this;
    this.api.guias_productos(this.user.id).subscribe({
      next(data){
        console.log(data);
        self.selec_productos=data.pedidos;
        self.guia=data.ultimaguia;
      },error(err){
        console.log(err);
      }
    })
    let date:any=new Date();
    console.log(date)
    console.log(date.getDate())
    this.fecha=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }

  add(){
    console.log('add')
    this.productos.push({
      id:'',
      cantidad:0,
      productos:[]
    });
  }
  delete(){
    this.productos.pop();
  }

  guardar(){
    this.cliente=this.user.name;
    let puede=true;
    console.log(this.productos)
    for (let i = 0; i < this.productos.length; i++) {
      for (let j = 0; j < this.selec_productos.length; j++) {
        if (this.productos[i].productos==this.selec_productos[j].id) {
          this.selec_productos[j].nombre=this.selec_productos[j].producto;
          this.productos[i].producto=this.selec_productos[j];
          this.productos[i].id=this.selec_productos[j].id;
          this.productos[i].nombre=this.selec_productos[j].producto;
          if (this.productos[i].cantidad<=0) {
            puede=false;
          }
        }
      }
    }
    if (puede) {
      let data={
        cliente:this.cliente,
        fecha:this.fecha,
        guia:this.guia,
        productosq:this.productos,
        productos:JSON.stringify(this.productos),
        receptor:this.receptor,
        remitente:this.remitente
      }
      console.log(data);
      let self=this;
      this.api.crear_guia(data).subscribe({
        next(data){
          console.log(data);
          self.gui();
          self.reset();
        },error(err){
          console.log(err);
        }
      })
    }else{
      alert('Las cantidades de los productos no pueden ser 0.')
    }
  }

  reset(){
    this.order_select={
      cliente:"",
      estado:1,
      fecha:"",
      id:59,
      productos:JSON.parse("[{\"id\":2,\"cantidad\":\"23\",\"producto\":{\"id\":2,\"producto\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2336\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2031\"},{\"id\":1,\"cantidad\":\"25\",\"producto\":{\"id\":1,\"producto\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2335\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2350\"}]"),
      productos1:JSON.parse("[{\"id\":2,\"cantidad\":\"23\",\"producto\":{\"id\":2,\"producto\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2336\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Celeste con plomo\",\"$$hashKey\":\"object:2031\"},{\"id\":1,\"cantidad\":\"25\",\"producto\":{\"id\":1,\"producto\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2335\"},\"nombre\":\"Limpiador Multifuncional - color:  - medida: Blanco con Naranja\",\"$$hashKey\":\"object:2350\"}]"),
      receptor: "Kanguro",
      remitente: "",
      guia:''
    };
    this.receptor="Kanguro";
    this.remitente="";
    this.productos=[{
      id:'',
      cantidad:0,
      productos:[],
      nombre:''
    }];
    this.cliente;
    this.fecha;
    this.selec_productos=[];
    this.guia;
  }
  /*

  https://kangurodelivery.com/api/public/api/producto_guia/313?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMywiaXNzIjoiaHR0cHM6XC9cL2thbmd1cm9kZWxpdmVyeS5jb21cL2FwaVwvcHVibGljXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjgzODM3MjQ1LCJleHAiOjE2OTY4MzMyNDUsIm5iZiI6MTY4MzgzNzI0NSwianRpIjoiMDBlNjcwNGExNTJjYzRiMjJhOGI3YTY4YzFhMWNkNTIifQ.J3dijRVQZgIGZa27TiWUBXQXJb0GjwAfNuZcZEsVXEs
  https://kangurodelivery.com/api/public/api/guias/store?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMxMywiaXNzIjoiaHR0cHM6XC9cL2thbmd1cm9kZWxpdmVyeS5jb21cL2FwaVwvcHVibGljXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjgzODM3NDkwLCJleHAiOjE2OTY4MzM0OTAsIm5iZiI6MTY4MzgzNzQ5MCwianRpIjoiMjQ4NjE4NzZkZTVjMjhjMTc2MWUyMzU4YzdlM2RkMDUifQ.EkgFwWpCARVmmmOyPvqOjUBNm8OQGsRmwoWEPcsoux4
  cliente
  : 
  "Fatima ecomerce "
  fecha
  : 
  "2023-05-11"
  fecha1
  : 
  "2023-05-11T20:38:17.789Z"
  guia
  : 
  73
  productos
  : 
  "[{\"id\":35,\"cantidad\":\"2\",\"producto\":{\"id\":35,\"producto\":\"Camisa - color: beige - medida: S\",\"$$hashKey\":\"object:407\"},\"nombre\":\"Camisa - color: beige - medida: S\",\"$$hashKey\":\"object:325\"}]"
   [{\"id\":35,\"cantidad\":\"10\",\"productos\":\"35\",\"producto\":{\"id\":35,\"producto\":\"Camisa - color: beige - medida: S\"}},{\"id\":38,\"cantidad\":\"10\",\"productos\":\"38\",\"producto\":{\"id\":38,\"producto\":\"Camisa - color: beige - medida: M\"}}]"
  receptor
  : 
  "ff"
  remitente
  : 
  "ff"
  */ 

}
