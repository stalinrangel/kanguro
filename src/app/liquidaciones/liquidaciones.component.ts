import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.css']
})
export class LiquidacionesComponent implements OnInit {

  user;
  guias;
  order_select:any={
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
    this.api.liquidaciones(this.user.id).subscribe({
      next(data){
        console.log(data);
        self.guias=data.liquidacions.reverse();
        //self.guias=data.guias.reverse();
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
  total=0;
  changeOrder(item){
    this.total=0;
    console.log(item)
    let aux:any=item;
    this.order_select = item;
    for (let i = 0; i < aux.nordens.length; i++) {
      this.total+=parseInt(aux.nordens[i].total_servicios);
    }
    this.order_select.productos1=aux.nordens;
    //this.status = item.estado;
    console.log(this.order_select)
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
  
  

}
