import { ViewportScroller } from '@angular/common';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';

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
  public soli=false;
  public geocoder = new google.maps.Geocoder();

  images = ["./assets/img/kanguro/slider1.svg",
            "./assets/img/kanguro/slider2.svg",
            "./assets/img/kanguro/slider3.svg"];
	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  showWeb: boolean = false;

  public box1=false;
  public box2=false;
  public box3=false;
  public box4=false;

  public precio:any=null;
  public cajas=0;

  public autocomplete:google.maps.places.Autocomplete[] = [];
  public map: google.maps.Map;
  public places: google.maps.places.PlacesService;
  public center:any;
  public markers: google.maps.Marker[] = [];
  public km: any=0;

  public infopedido:any={
    origen:'',
    destino:''
  }

  public origen:any='';
  public destino:any='';

  public user;

  constructor(private router: Router ,private viewportScroller: ViewportScroller, private api: ApiService, private modalService: NgbModal, private uss: UserStorageService) {
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit() {
    this.initMap();
  }

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

  initMap(){
   /* 

    
    // The map, centered at Uluru
   */
    this.center = { lat: 41.363218, lng: 2.112014 };
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: this.center,
      draggable: true
    });
    const defaultBounds = {
      north: this.center.lat + 0.2,
      south: this.center.lat - 0.2,
      east: this.center.lng + 0.2,
      west: this.center.lng - 0.2,
    };
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "es" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: true,
      types: ["geocode"],
    };
    setTimeout(function(){
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const input2 = document.getElementById("pac-input2") as HTMLInputElement;
      this.origen = new google.maps.places.Autocomplete(input, options);
      this.destino = new google.maps.places.Autocomplete(input2, options);
      //self.places = new google.maps.places.PlacesService(self.map);
      
      let hasDownBeenPressed = false;
      let hasDownBeenPressed1 = false;

      input.addEventListener('keydown', (e) => {
        if (e.keyCode === 40) {
            hasDownBeenPressed = true;
        }
      });

      google.maps.event.addDomListener(input, 'keydown', (e:any) => {
          e.cancelBubble = true;
          if (e.keyCode === 13 || e.keyCode === 9) {
              if (!hasDownBeenPressed && !e.hasRanOnce) {
                  google.maps.event.trigger(e.target, 'keydown', {
                      keyCode: 40,
                      hasRanOnce: true,
                  });
              }
          }
      });

      input.addEventListener('focus', () => {
          hasDownBeenPressed = false;
          input.value = '';
      });

      google.maps.event.addListener(this.origen, 'place_changed', () => {
          const place = this.origen.getPlace();
          console.log(place)

          if (typeof place.address_components !== 'undefined') {          
              hasDownBeenPressed = false;
          }
      });

      input2.addEventListener('keydown', (e) => {
        if (e.keyCode === 40) {
            hasDownBeenPressed1 = true;
        }
      });

      google.maps.event.addDomListener(input2, 'keydown', (e:any) => {
          e.cancelBubble = true;
          if (e.keyCode === 13 || e.keyCode === 9) {
              if (!hasDownBeenPressed1 && !e.hasRanOnce) {
                  google.maps.event.trigger(e.target, 'keydown', {
                      keyCode: 40,
                      hasRanOnce: true,
                  });
              }
          }
      });

      input2.addEventListener('focus', () => {
          hasDownBeenPressed1 = false;
          input2.value = '';
      });

      google.maps.event.addListener(this.destino, 'place_changed', () => {
          const place = this.destino.getPlace();
          console.log(place)

          if (typeof place.address_components !== 'undefined') {          
              hasDownBeenPressed1 = false;
          }
      });
    }, 1800)
  }

  ver(i){
    let self=this;
    setTimeout(function(){
      if (i==0) {
        console.log(this.origen.getPlace())
        if(this.origen.getPlace()==undefined){
          self.geocoder.geocode({
            'address': self.infopedido.origen
          }, function(responses) {
            console.log(responses);
            if (responses && responses.length > 0) {
              console.log(responses[0]);
              self.infopedido.origenInfo=responses[0];
              self.infopedido.origen=responses[0].formatted_address;
              if (self.infopedido.origenInfo.geometry.location && self.infopedido.destinoInfo.geometry.location) {
                console.log('amos')
                self.calculekm(self.infopedido.origenInfo.geometry,self.infopedido.destinoInfo.geometry);
              }
            } else {
              alert('No conseguimos tu direccion, por favor seleccionala del lista de recomendacion y arrastre el marcador a la posicion deseada.')
            }
          });
        }
      }else if (i==1) {
        console.log(this.destino.getPlace())
        if(this.destino.getPlace()==undefined){
          self.geocoder.geocode({
            'address': self.infopedido.destino
          }, function(responses) {
            console.log(responses);
            if (responses && responses.length > 0) {
              console.log(responses[0]);
              self.infopedido.destinoInfo=responses[0];
              self.infopedido.destino=responses[0].formatted_address;
              if (self.infopedido.origenInfo.geometry.location && self.infopedido.destinoInfo.geometry.location) {
                console.log('amos')
                self.calculekm(self.infopedido.origenInfo.geometry,self.infopedido.destinoInfo.geometry);
              }
            } else {
              alert('No conseguimos tu direccion, por favor seleccionala del lista de recomendacion y arrastre el marcador a la posicion deseada.')
            }
          });
        }
      }
      console.log(this.origen.getPlace().geometry.location)
      if (this.origen.getPlace().geometry.location && this.destino.getPlace().geometry.location) {
        console.log('amos')
        self.calculekm(this.origen.getPlace().geometry,this.destino.getPlace().geometry);
      }
      
    }, 800);
  }

  calculekm(o,d){

    console.log(this.haversine_distance(o,d));
    this.km=0;
    this.km=this.haversine_distance(o,d);
  }
  haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.location.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.location.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.location.lng()-mk1.location.lng()) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
   
    return d;
  }

  calcular(){
    let xl1=1.80;
    let xl2=2.40;
    let xl3=3.00;
    let xl4=3.60;

    this.precio=0;
    console.log(this.precio,this.km,this.cajas);
    if (this.cajas==0) {
      alert('Seleccione una el tamano de su envio');    
    }else{
      console.log(this.precio,this.km,this.cajas);
      if (this.km==0) {
        alert('Seleccione un origen y un destino');  
      } else {
        console.log(this.precio,this.km,this.cajas);
          if (this.km>20) {
            alert('Tu pedido es mayor a 20 km no lo podemos procesar.');
          }else{
            console.log(this.precio,this.km,this.cajas);
            this.soli=true;
            console.log(this.soli);
            if (this.km<=5) {
              if (this.cajas==1) {
              this.precio=xl1*5; 
              }
              if (this.cajas==2) {
                this.precio=xl2*5; 
              }
              if (this.cajas==3) {
                this.precio=xl3*5; 
              }
              if (this.cajas==4) {
                this.precio=xl4*5; 
              }
            }else if (this.km>5) {
                
                if (this.cajas==1) {
                  this.precio=xl1*this.km; 
                }
                if (this.cajas==2) {
                  this.precio=xl2*this.km; 
                }
                if (this.cajas==3) {
                  this.precio=xl3*this.km; 
                }
                if (this.cajas==4) {
                  this.precio=xl4*this.km; 
                }
            }
            
          }
      }
    }

  }
  boxes(){
    this.cajas=0;
    console.log(this.box1, this.box2,this.box3,this.box4)
    if (this.box1) {
      this.cajas=this.cajas+1;
    }
    if (this.box2) {
      this.cajas=this.cajas+1;
    }
    if (this.box3) {
      this.cajas=this.cajas+1;
    }
    if (this.box4) {
      this.cajas=this.cajas+1;
    }
    console.log(this.cajas)
    this.calcular();
  }

  solicitar(){
    console.log(this.uss)
        this.user=this.uss.user;
        console.log(this.user)
        if(!this.user){
          this.router.navigate(['/iniciar']);
        }else if (this.user.user) {
          this.router.navigate(['/pedido']);
        }
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
    } else if (modalDimension === '' && type === 'Cotizar') {
    this.modalService.open(content, { windowClass: 'modal-cotizar', centered: true, backdrop: false }).result.then((result) => {
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
