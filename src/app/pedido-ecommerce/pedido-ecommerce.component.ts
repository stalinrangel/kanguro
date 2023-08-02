import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

declare var google: any;
const now = new Date();
@Component({
  selector: 'app-pedido-ecommerce',
  templateUrl: './pedido-ecommerce.component.html',
  styleUrls: ['./pedido-ecommerce.component.scss']
})
export class PedidoEcommerceComponent implements OnInit {

  constructor(
    private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router, private calendar: NgbCalendar
  ) { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }
  showWeb: boolean = false;
  public user:any;
  closeResult: string;
  public autocomplete:google.maps.places.Autocomplete[] = [];
  public map: google.maps.Map;
  public places: google.maps.places.PlacesService;
  public center:any;
  public markers: google.maps.Marker[] = [];
  public km: any=0;
  public directionsRenderer = new google.maps.DirectionsRenderer();
  public directionsService = new google.maps.DirectionsService();
  public geocoder = new google.maps.Geocoder();
  public isDanger2=false;
  public precio=0;
  private pos=0;
  public orige:any={
    'tipo':'',
    'fecha':'',
    'fecha_origen':'',
    'hora':'',
    'horario':'',
    'estado':'',
    'nombre':'',
    'forma_pago': '',
    'costo':0,
    'costo_recojo': 0,
    'km':'',
    'min':'',
    'cajap':'1',
    'cajam':'',
    'cajag':'',
    'cancelado':0,
    'reprogramado':0,
    'tipo_usuario':'',
    'turno_origen':'2',
    'puerta':''
  }
  public destinos:any=[];

  minDate: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()+1};
  model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};


  manana= now.setDate(now.getDate() + 1);

  public destino:any={
    'tipo':'',
    'fecha':'',
    'fecha_origen':'',
    'hora':'',
    'horario':'',
    'estado':'',
    'nombre':'',
    'forma_pago': '',
    'costo':0,
    'costo_recojo': 0,
    'km':'',
    'min':'',
    'cajap':'',
    'cajam':'',
    'cajag':'',
    'cancelado':0,
    'reprogramado':0,
    'tipo_usuario':'',
    'pedido_id':'',
    'origen':'',
    'departamento_origen':'',
    'nombre_origen':'Almacen Kanguro',
    'telefono_origen':'',
    'distrito_origen':'',
    'zona_origen': '',
    'comentarios':'',
    'puerta':'',
    'lat':'',
    'lng':'',
    'destino':'',
    'departamento_destino':'',
    'nombre_destino':'',
    'telefono_destino':'',
    'distrito_destino':'',
    'zona_destino':'',
    'comentarios2':'',
    'lat2':'',
    'lng2':'',
    'n_marcador':'',
    'cobrarecommerce':'',
    'descuento':'',
    'cantidad':0,
    'detalle':'',
    'subtotal':0,
    'fecha_destino': { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() +2 },
    'turno_destino':'2',
    'hora_destino':'10 Hrs - 19 Hrs',
    'productos':[]
  }
  fechaselec= { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() +2 };
  public rangos:any=[
    '10 Hrs - 19 Hrs'
  ];
  public fecha:any=now;
  public products: any = [];
  public selec_products: any = [];

  
  

  ngOnInit(): void {
    let diaSemana = now.getDay(); // devuelve 6 para sábado

    if (diaSemana === 6) {
      console.log('Hoy es sábado');
      this.minDate= {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()+2};
    } else {
      console.log('Hoy no es sábado');
    }
    this.user=this.uss.user;
    this.user=this.user.user;
    console.log(this.user)
    
   
    this.getDate();
    this.getProduct();
    console.log(new Date(this.manana))
  }

  getProduct(){
    let self = this;
    this.api.inventario(this.user.id).subscribe({
      next(data:any){
        self.products = data.productos;
        
        for (let i = 0; i < self.products.length; i++) {
          self.products[i].c=0;
          self.products[i].a=0;
          for (let j = 0; j < self.products[i].colores.length; j++) {
            self.products[i].colores[j].imagen= 'https://www.kangurodelivery.com/Pedido/' +self.products[i].colores[j].imagen;
            self.products[i].selec_image=self.products[i].colores[0].imagen;
            self.products[i].selec_atributos=self.products[i].colores[0].atributos;
            self.products[i].selec_cantidad=self.products[i].colores[0].atributos[0].cantidad;
            self.products[i].selec_selec=0;
            for (let k = 0; k < self.products[i].colores[j].atributos.length; k++) {
              self.products[i].colores[j].atributos
            }
          }
        }
        
        /*self.products.forEach(element => {
          element.cantidad = 0;
          element.colores.forEach(element1 => {
            element.imagen = 'https://www.kangurodelivery.com/Pedido/' + element1.imagen;
            element1.atributos.forEach(element2 => {
              element.cantidad = element.cantidad + element2.cantidad;
            });
          });
        });*/
        console.log(self.products);
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  selectColor(p,i){
    console.log(p,i)
    let self=this;
    self.products[p].c=i;
    self.products[p].a=0;

    self.products[p].selec_image=self.products[p].colores[i].imagen;
    self.products[p].selec_atributos=self.products[p].colores[i].atributos;
    self.products[p].selec_cantidad=self.products[p].colores[i].atributos[0].cantidad;
    self.products[p].selec_selec=self.products[p].colores[i].atributos[0].cant;
  }
  selectAtributo(p,a){
    let self=this;
    let color = self.products[p].c;
    self.products[p].a=a;
    console.log(p,color,a)

    self.products[p].selec_image=self.products[p].colores[color].imagen;
    self.products[p].selec_atributos=self.products[p].colores[color].atributos;
    self.products[p].selec_cantidad=self.products[p].colores[color].atributos[a].cantidad;
    self.products[p].selec_selec=self.products[p].colores[color].atributos[a].cant;
  }

  add(p){
    let self=this;
    let color = self.products[p].c;
    let atributo = self.products[p].a;
    console.log(p,color,atributo);
    if (self.products[p].colores[color].atributos[atributo].cantidad>0) {
      self.products[p].selec_selec=self.products[p].selec_selec+1;  
      self.products[p].colores[color].atributos[atributo].cant=self.products[p].selec_selec;  
      self.products[p].colores[color].atributos[atributo].cantidad=self.products[p].colores[color].atributos[atributo].cantidad-1;
      self.products[p].selec_cantidad=self.products[p].colores[color].atributos[atributo].cantidad;
    }
  }

  quitar(p){
    let self=this;
    let color = self.products[p].c;
    let atributo = self.products[p].a;
    console.log(p,color,atributo);
    if (self.products[p].colores[color].atributos[atributo].cant>0) {
      self.products[p].selec_selec=self.products[p].selec_selec-1;  
      self.products[p].colores[color].atributos[atributo].cant=self.products[p].selec_selec;  
      self.products[p].colores[color].atributos[atributo].cantidad=self.products[p].colores[color].atributos[atributo].cantidad+1;
      self.products[p].selec_cantidad=self.products[p].colores[color].atributos[atributo].cantidad;
    }
  }
  n(i){
    console.log(i)
    this.pos=i;
  }
  despachar(){
    this.selec_products=[];
    let self=this;
    for (let i = 0; i < self.products.length; i++) {
      for (let j = 0; j < self.products[i].colores.length; j++) {
        for (let k = 0; k < self.products[i].colores[j].atributos.length; k++) {
          if (self.products[i].colores[j].atributos[k].cant>0) {
            //this.selec_products.push(self.products[i])
            //this.destinos[this.pos].productos.push(self.products[i]);
          }
        }
      }
    }
    console.log(this.selec_products)
    this.detalle();
  }

  detalle(){
    //this.destino.cantidad=0;
    //this.destino.detalle='';
    let self=this;
    for (let i = 0; i < self.products.length; i++) {
      for (let j = 0; j < self.products[i].colores.length; j++) {
        for (let k = 0; k < self.products[i].colores[j].atributos.length; k++) {
          if (self.products[i].colores[j].atributos[k].cant>0) {
            //this.destino.detalle=this.destino.detalle+self.products[i].colores[j].atributos[k].cant+' '+self.products[i].nombre+' '+self.products[i].colores[j].nombrecolor+' '+self.products[i].colores[j].atributos[k].atributo+'. ';
            //this.destino.cantidad=this.destino.cantidad+self.products[i].colores[j].atributos[k].cant;
            this.destinos[this.pos].detalle=this.destinos[this.pos].detalle+self.products[i].colores[j].atributos[k].cant+' '+self.products[i].nombre+' '+self.products[i].colores[j].nombrecolor+' '+self.products[i].colores[j].atributos[k].atributo+'. ';
            console.log(self.products[i].colores[j].atributos[k].cant)
            console.log(this.destinos[this.pos].cantida)
            this.destinos[this.pos].cantidad=this.destinos[this.pos].cantidad+self.products[i].colores[j].atributos[k].cant;
            this.destinos[this.pos].productos.push(self.products[i]);

          }
        }
      }
    }
    console.log(this.destinos)
    //this.destino.productos=this.selec_products;
    this.calcular();
  }
  cantidad:any=0;
  calcular(){
    this.precio=6*this.destinos.length;
    this.cantidad=0;
    for (let i = 0; i < this.destinos.length; i++) {
      console.log(this.products[i].cantidad)
      this.cantidad+=this.products[i].cantidad;
    }
    this.destino.cantidad=this.cantidad;
  }

  enviar(){
    console.log(this.orige)
    console.log(this.destinos)
    console.log(this.autocomplete)
    this.calcular();
    for (let i = 0; i < this.destinos.length; i++) {
      this.destinos[i].nombre_origen=this.orige.nombre_origen;
      this.destinos[i].origen=this.orige.origen;
      this.destinos[i].departamento_origen=this.orige.departamento_origen;
      this.destinos[i].distrito_origen=this.orige.distrito_origen;
      this.destinos[i].telefono_origen=this.orige.telefono_origen;
      this.destinos[i].comentarios=this.orige.comentarios;
      this.destinos[i].fecha_destino=this.fechaselec.year+'-'+this.fechaselec.month+'-'+this.fechaselec.day;
      this.destinos[i].fecha=this.fechaselec.year+'-'+this.fechaselec.month+'-'+this.fechaselec.day;
      this.destinos[i].lat=this.orige.lat;
      this.destinos[i].lng=this.orige.lng;
    }
    console.log(this.orige)
    console.log(this.destinos)
    this.crear_pedido();
  }
  
  crear_pedido(){
    let self = this;
    let destinos=JSON.stringify(this.destinos);
    //this.destinos=JSON.parse(this.destinos);
    console.log(this.destinos)
    let data = {
      pedido:destinos
    }
    console.log(data)
    this.api.crear_pedido_ecommerce(data).subscribe({
      next(data){
        console.log(data);
        alert('pedido enviado con exito');
        self.router.navigate(['/estadoPedidoEcommerce']);
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  limpiar1(i){
    this.destinos[i]={
      'tipo':'',
      'fecha':'',
      'fecha_origen':'',
      'hora':'',
      'horario':'',
      'estado':'',
      'nombre':'',
      'forma_pago': '',
      'costo':0,
      'costo_recojo': 0,
      'km':'',
      'min':'',
      'cajap':'',
      'cajam':'',
      'cajag':'',
      'cancelado':0,
      'reprogramado':0,
      'tipo_usuario':'',
      'pedido_id':'',
      'origen':'',
      'departamento_origen':'',
      'nombre_origen':'Almacen Kanguro',
      'telefono_origen':'',
      'distrito_origen':'',
      'zona_origen': '',
      'comentarios':'',
      'lat':'',
      'lng':'',
      'destino':'',
      'departamento_destino':'',
      'nombre_destino':'',
      'telefono_destino':'',
      'distrito_destino':'',
      'zona_destino':'',
      'comentarios2':'',
      'lat2':'',
      'lng2':'',
      'n_marcador':'',
      'cobrarecommerce':'',
      'descuento':'',
      'cantidad':0,
      'detalle':'',
      'subtotal':0,
      'fecha_destino':{ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1 },
      'turno_destino':'',
      'hora_destino':'',
      'productos':[]
    };
  }













  initDatos(){

    //Inicio Origen
    this.orige.tipo='PROGRAMADO';
    console.log(this.fecha)
    this.orige.fecha=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate();
    console.log(this.orige.fecha)
    this.orige.fecha_origen=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.orige.estado=0;
    this.orige.nombre=this.user.name;
    this.orige.nombre_origen='Almacen Kanguro';
    this.orige.tipo_usuario=this.user.tipo_usuario;

    this.destino.tipo='PROGRAMADO';
    this.destino.fecha=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.destino.fecha_origen=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.destino.estado=0;
    this.destino.nombre=this.user.name;
    this.destino.tipo_usuario=this.user.tipo_usuario;
    console.log(this.destino)
    this.destino.fecha_destino={ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() +1};
    this.destinos.push(this.destino);
    this.initMap();
  }


  addDestinos(){
    console.log('add')
    /**this.destino.tipo='URGENTE';
    this.destino.fecha=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.destino.fecha_origen=this.fecha.getFullYear()+'-'+(this.fecha.getMonth()+1)+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.destino.estado=0;
    this.destino.nombre=this.user.name;
    this.destino.tipo_usuario=this.user.tipo_usuario;*/
    


    this.destinos.push(
      {
        'tipo':'PROGRAMADO',
        'fecha':now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate(),
        'fecha_origen':now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+'00'+':'+'00',
        'hora':'',
        'horario':'',
        'estado':0,
        'nombre':'',
        'forma_pago': '',
        'costo':0,
        'costo_recojo': 0,
        'km':'',
        'min':'',
        'cajap':'',
        'cajam':'',
        'cajag':'',
        'cancelado':0,
        'reprogramado':0,
        'tipo_usuario':this.user.tipo_usuario,
        'pedido_id':'',
        'origen':'',
        'departamento_origen':'',
        'nombre_origen':'Almacen Kanguro',
        'telefono_origen':'',
        'distrito_origen':'',
        'zona_origen': '',
        'comentarios':'',
        'lat':'',
        'lng':'',
        'destino':'',
        'departamento_destino':'',
        'nombre_destino':'',
        'telefono_destino':'',
        'distrito_destino':'',
        'zona_destino':'',
        'comentarios2':'',
        'lat2':'',
        'lng2':'',
        'n_marcador':'',
        'cobrarecommerce':'',
        'descuento':'',
        'cantidad':0,
        'detalle':'',
        'subtotal':0,
        'fecha_destino':{ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1 },
        'turno_destino':'',
        'hora_destino':'',
        'productos':[]
      }
    );
    let self=this;
    setTimeout(function() { 
      let tam=self.destinos.length;
      let pac="pac-input"+(tam-1);
      console.log(pac)
      const input = document.getElementById(pac) as HTMLInputElement;
      console.log( this.options)
      console.log( self.options)
      self.autocomplete.push(new google.maps.places.Autocomplete(input, this.options));
      console.log(tam)
     }, 2000);
    
    
  }
  deleteDestinos(i){
    this.destinos.splice(i);
    this.autocomplete.splice(i+1);
  }
  getDate(){
    let self = this;
    this.api.fecha().subscribe({
      next(data){
        console.log(data);
        
      },error(err){
        
        self.fecha=new Date(err.error.text);
        console.log(self.fecha);
        console.log(self.fecha.getDate());
        console.log(self.fecha.getMonth());
        console.log(self.fecha.getFullYear());
        console.log(self.fecha.getHours());
        console.log(self.fecha.getFullYear()+'-'+self.fecha.getMonth()+'-'+self.fecha.getDate()+' '+self.fecha.getHours()+':'+'00'+':'+'00');
        self.initDatos();
      }
    })
  }
  // Initialize and add the map
  options:any;
  initMap() {
    this.center = { lat: 41.363218, lng: 2.112014 };

    const defaultBounds = {
      north: this.center.lat + 0.2,
      south: this.center.lat - 0.2,
      east: this.center.lng + 0.2,
      west: this.center.lng - 0.2,
    };
    // The map, centered at Uluru
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: this.center,
      draggable: true
    });
    this.directionsService = new google.maps.DirectionsService();
    var mapa=this.map;
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      mapa,
      panel: document.getElementById("panel") as HTMLElement,
    });
    console.log(this.directionsRenderer);
    this.directionsRenderer.addListener("directions_changed", () => {
      const directions = this.directionsRenderer.getDirections();

      if (directions) {
        //console.log(directions)
        let info=directions;
        console.log(info)
        console.log(info.routes[0].legs[0].start_address)
        console.log(info.routes[0].legs[0].end_address)
        this.geocodePosition(info.routes[0].legs[0].start_location,0)
        this.geocodePosition(info.routes[0].legs[0].end_location,1)

      /*this.orige.origen=info.routes[0].legs[0].start_address;
        this.orige.km=info.routes[0].legs[0].distance.value/1000;
        this.km=info.routes[0].legs[0].distance.value/1000;
        this.destinos[0].destino=info.routes[0].legs[0].end_address;*/
        //computeTotalDistance(directions);
      }
    });
    // The marker, positioned at Uluru
    /*const marker = new google.maps.Marker({
      position: center,
      map: this.map,
    });*/
    
    let self=this;
    
    setTimeout(function(){
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const input2 = document.getElementById("pac-input0") as HTMLInputElement;
      console.log(input2)
      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "es" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: true,
        types: ["geocode"],
      };
      this.options=options;
      const options2 = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"],
      };
      let hasDownBeenPressed = false;
      let hasDownBeenPressed1 = false;

      //input 1
      self.autocomplete[0] = new google.maps.places.Autocomplete(input, options);
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
      //input 2
      self.autocomplete[1] = new google.maps.places.Autocomplete(input2, options);
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
      //////////////////////////////////////////////

      self.places = new google.maps.places.PlacesService(self.map);
      self.directionsRenderer.setMap(self.map);
      const newBounds = new google.maps.LatLngBounds(this.center);

      //self.autocomplete[0].setBounds(newBounds);
     // self.autocomplete[1].setBounds(newBounds);
      console.log(self.autocomplete)
    }, 800);
    setTimeout(function(){
     // self.geolocate();
    }, 1800)
  } 
  
  onPlaceChanged(i):any {
    const place = this.autocomplete[i].getPlace();
    console.log(place)

    if (i==0) {
      let tam=place.address_components.length;
      this.orige.distrito_origen=place.address_components[tam-1].long_name;
    }else{
      console.log(i)
      let tam=place.address_components.length;
      this.destinos[i-1].distrito_destino=place.address_components[tam-1].long_name;
    }

    if (place.geometry && place.geometry.location) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.set_markers(place.geometry.location,i);
    } else {
      (document.getElementById("autocomplete") as HTMLInputElement).placeholder =
        "Enter a city";
    }
  }
  set_markers(val,i){
    console.log(val)
    this.destinos[i-1].lat2=val.lat();
    this.destinos[i-1].lng2=val.lng();
    const marker = new google.maps.Marker({
      position: val,
      map: this.map,
      draggable: true,
    });
    this.markers.push(marker)
    let self=this;
    marker.addListener('dragend',(event) => { 
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      self.geocodePosition(event.latLng,i)
    });
  }
  geocodePosition(pos,i) {
    let self=this;
    this.geocoder.geocode({
      'latLng': pos
    }, function(responses) {
      console.log(responses);
      if (responses && responses.length > 0) {
        console.log(responses[0]);
        if (i==0) {
          self.orige.origen=responses[0].formatted_address;
          let tam=responses[0].address_components.length;
          self.orige.distrito_origen=responses[0].address_components[tam-1].long_name;
          

        }else{
          console.log(i)
          self.destinos[i-1].destino=responses[0].formatted_address;
          let tam=responses[0].address_components.length;
          self.destinos[i-1].distrito_destino=responses[0].address_components[tam-1].long_name;
          
        }
      } else {
      }
    });
  }
  ver(i){
    console.log(i)
    let self=this;
    setTimeout(function(){
      console.log(self.autocomplete[i].getPlace())
      if (self.autocomplete[i].getPlace()!=undefined) {
        
        if (i==0) {
          let tam=self.autocomplete[i].getPlace().address_components.length;
          self.orige.distrito_origen=self.autocomplete[i].getPlace().address_components[tam].long_name;
        }else{
          console.log(i)
          let tam=self.autocomplete[i].getPlace().address_components.length;
          self.destinos[i-1].distrito_destino=self.autocomplete[i].getPlace().address_components[tam].long_name;
        }
        self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
      }else{

        self.geocoder.geocode({
            'address': self.orige.origen
          }, function(responses) {
            console.log(responses);
            if (responses && responses.length > 0) {
            console.log(responses[0]);
            if (i==0) {
              self.orige.origen=responses[0].formatted_address;
              let tam=responses[0].address_components.length;
              self.orige.distrito_origen=responses[0].address_components[tam-1].long_name;
              if (responses[0].geometry && responses[0].geometry.location) {
                self.map.panTo(responses[0].geometry.location);
                self.map.setZoom(15);
                self.set_markers(responses[0].geometry.location,i);
              } 
            }else{
              console.log(i)
              self.destinos[i-1].destino=responses[0].formatted_address;
              let tam=responses[0].address_components.length;
              self.destinos[i-1].distrito_destino=responses[0].address_components[tam-1].long_name;
              self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
            }
          } else {
            //alert('No conseguimos tu direccion, por favor seleccionala del lista de recomendacion y arrastre el marcador a la posicion deseada.')
            self.danger2();
          }
          });
        }
    }, 800);
  }

  buildAddressDestino(address){
    console.log(address)
    let dir='';
    for (let i = 0; i < address.length; i++) {
     dir += ' '+address[i].long_name;
    }
    return dir;
  }
  buildZipCodeDestino(address){
    console.log(address)
    let zip='';
    for (let i = 0; i < address.length; i++) {
     zip = address[i].long_name;
    }
    return zip;
  }
  ver2(i){
    console.log(i)
    console.log(this.autocomplete)
    let self=this;
    //this.limpiar();
    setTimeout(function(){
      console.log(self.autocomplete[i].getPlace())
      if (self.autocomplete[i].getPlace()!=undefined) {
        console.log('place')
        self.destinos[i-1].destino=self.buildAddressDestino(self.autocomplete[i].getPlace().address_components);
        self.destinos[i-1].distrito_destino=self.buildZipCodeDestino(self.autocomplete[i].getPlace().address_components);
        //cargar la latitud y lng desde el geocode
        //self.destinos[i-1].lat2="";
        //self.destinos[i-1].lng2="";
        self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
        //self.traceRoute(i);
      }else{
        console.log('geocode')
        self.geocoder.geocode({
            'address': self.destinos[i-1].destino
          }, function(responses) {
            console.log(responses);
            if (responses && responses.length > 0) {
            console.log(responses[0]);
            if (i==0) {
              self.orige.origen=responses[0].formatted_address;
              let tam=responses[0].address_components.length;
              self.orige.distrito_origen=responses[0].address_components[tam-1].long_name;
              if (responses[0].geometry && responses[0].geometry.location) {
                self.map.panTo(responses[0].geometry.location);
                self.map.setZoom(15);
                self.set_markers(responses[0].geometry.location,i);
                self.traceRoute(i);
              } 
            }else{
              console.log(i)
              self.destinos[i-1].destino=responses[0].formatted_address;
              let tam=responses[0].address_components.length;
              self.destinos[i-1].distrito_destino=responses[0].address_components[tam-1].long_name;
              if (responses[0].geometry && responses[0].geometry.location) {
                self.map.panTo(responses[0].geometry.location);
                self.map.setZoom(15);
                self.set_markers(responses[0].geometry.location,i);
                self.traceRoute(i);
              } 
            }
          } else {
            //alert('No conseguimos tu direccion, por favor seleccionala del lista de recomendacion y arrastre el marcador a la posicion deseada.')
            self.danger2();
          }
          });
      }
    }, 800);
  }
  traceRoute(i){
    
    this.calculateAndDisplayRoute(this.directionsService,this.directionsRenderer);
   // this.calculekm(i);
  }
  calculekm(i){
    var n=this.markers.length;
    console.log(n);
    this.km=0;
    this.km=this.km+this.haversine_distance([],this.markers[i]);
    this.destinos[i-1].km=this.haversine_distance([],this.markers[i]);

    //this.asignaKm(i);
  }
  asignaKm(i){
    this.orige.km=this.km;
    this.orige.lat=this.center.lat;
    this.orige.lng=this.center.lng;
    this.destinos[i-1].lat=this.center.lat;
    this.destinos[i-1].lng=this.center.lng;
    this.destinos[i-1].lat2=this.markers[1].getPosition().lat();
    this.destinos[i-1].lng2=this.markers[1].getPosition().lng();
    console.log(this.center.lat)
    console.log(this.markers[1].getPosition().lat())
    this.limpiar();
  }
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const selectedMode = "DRIVING";
    this.directionsService
      .route({
        origin: this.center, // Haight.
        destination: this.markers[0].getPosition(), // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  haversine_distance([], mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = this.center.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-this.center.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
   
    return d;
  }
  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i]) {
        this.markers[i].setMap(null);
      }
    }
    this.markers = [];
  }
  limpiar(){
    this.clearMarkers();
  }


  


  open(content, type) {
    console.log(type)
    if(type == 'classic'){
      this.modalService.open(content, { windowClass: 'modal-cotizar', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } else if(type == 'payment'){
      this.modalService.open(content, { windowClass: 'modal-payment', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } else if(type == 'confirm'){
      this.modalService.open(content, { windowClass: 'modal-confirm', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } else if(type == 'view'){
      this.modalService.open(content, { windowClass: 'modal-add', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    }
  }

  danger2(){
    this.isDanger2=true;
    let self = this;
    setTimeout(() => {
      self.isDanger2=false
    }, 3000);
  }

}
