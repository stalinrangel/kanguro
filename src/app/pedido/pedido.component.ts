import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,  NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
declare var google: any;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

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
    'cajap':'',
    'cajam':'',
    'cajag':'',
    'cancelado':0,
    'reprogramado':0,
    'tipo_usuario':'',
    'nombre_origen':'',
    'origen':'',
    'departamento_origen':'',
    'distrito_origen':'',
    'telefono_origen':'',
    'comentarios':'',
    'lat':'',
    'lng':''
  }
  public destinos:any=[];
  public destino:any={
    'pedido_id':'',
    'origen':'',
    'departamento_origen':'',
    'nombre_origen':'',
    'telefono_origen':'',
    'distrito_origen': '',
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
    'km':'',
    'min':'',
    'n_marcador':'',
    'cobrarecommerce':'',
    'descuento':'',
    'costo':0,
    'cantidad':0,
    'detalle':'',
    'subtotal':0,
    'fecha_destino':'',
    'turno_destino':'',
    'hora_destino':''
  }
  public fecha:any;

  constructor(
    private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router
  ) { }

  ngOnInit(): void {
    this.user=this.uss.user;
    this.user=this.user.user;
    console.log(this.user)
    
   
    this.getDate();
  }

  initDatos(){

    //Inicio Origen
    this.orige.tipo='URGENTE';
    this.orige.fecha=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.orige.fecha_origen=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.orige.estado=0;
    this.orige.nombre=this.user.name;
    this.orige.tipo_usuario=this.user.tipo_usuario;
    console.log(this.orige)
    this.destino.fecha_destino=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate();
    this.destinos.push(this.destino);
    this.initMap();
  }
  geolocate(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos)
          this.geocodePosition(pos,0);
         // infoWindow.setPosition(pos);
         // infoWindow.setContent("Location found.");
         // infoWindow.open(map);
         // map.setCenter(pos);
        },
        () => {
          //handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      //handleLocationError(false, infoWindow, map.getCenter()!);
    }
  }
  addDestinos(){
    console.log('add')
    this.destinos.push(this.destino);
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
  initMap() {
    this.center = { lat: 41.363218, lng: 2.112014 };

    const defaultBounds = {
      north: this.center.lat + 0.9,
      south: this.center.lat - 0.9,
      east: this.center.lng + 0.9,
      west: this.center.lng - 0.9,
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
        this.orige.origen=info.routes[0].legs[0].start_address;
        this.orige.km=info.routes[0].legs[0].distance.value/1000;
        this.km=info.routes[0].legs[0].distance.value/1000;
        this.destinos[0].destino=info.routes[0].legs[0].end_address;
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
      const input2 = document.getElementById("pac-input2") as HTMLInputElement;
      
      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "es" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: true,
        types: ["geocode"],
      };
      const options2 = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"],
      };
      self.autocomplete[0] = new google.maps.places.Autocomplete(input, options);
      self.autocomplete[1] = new google.maps.places.Autocomplete(input2, options);
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
          self.orige.distrito_origen=responses[0].address_components[6].long_name;

        }else{
          console.log(i)
          self.destinos[i-1].destino=responses[0].formatted_address;
          self.destinos[i-1].distrito_destino=responses[0].address_components[6].long_name;
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
      self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
    }, 800);
  }
  ver2(i){
    console.log(i)
    let self=this;
    //this.limpiar();
    setTimeout(function(){
      console.log(self.autocomplete[i].getPlace())
      self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
      self.traceRoute(i);
    }, 800);
  }
  traceRoute(i){
    
    this.calculateAndDisplayRoute(this.directionsService,this.directionsRenderer);
    this.calculekm(i);
  }
  calculekm(i){
    var n=this.markers.length;
    console.log(n);
    this.km=this.km+this.haversine_distance(this.markers[i-1],this.markers[i]);
    this.destinos[i-1].km=this.haversine_distance(this.markers[i-1],this.markers[i]);

    this.asignaKm(i);
  }
  asignaKm(i){
    this.orige.km=this.km;
    this.orige.lat=this.markers[0].getPosition().lat();
    this.orige.lng=this.markers[0].getPosition().lng();
    this.destinos[i-1].lat=this.markers[0].getPosition().lat();
    this.destinos[i-1].lng=this.markers[0].getPosition().lng();
    this.destinos[i-1].lat2=this.markers[1].getPosition().lat();
    this.destinos[i-1].lng2=this.markers[1].getPosition().lng();
    console.log(this.markers[0].getPosition().lat())
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
        origin: this.markers[0].getPosition(), // Haight.
        destination: this.markers[1].getPosition(), // Ocean Beach.
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

  haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

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


  enviar(){
    console.log(this.orige)
    console.log(this.destinos)
    for (let i = 0; i < this.destinos.length; i++) {
      this.destinos[i].nombre_origen=this.orige.nombre_origen;
      this.destinos[i].origen=this.orige.origen;
      this.destinos[i].departamento_origen=this.orige.departamento_origen;
      this.destinos[i].distrito_origen=this.orige.distrito_origen;
      this.destinos[i].telefono_origen=this.orige.telefono_origen;
      this.destinos[i].comentarios=this.orige.comentarios;
      this.destinos[i].lat=this.orige.lat;
      this.destinos[i].lng=this.orige.lng;
    }

    this.crear_pedido();
  }

  crear_pedido(){
    let self = this;
    this.api.crear_pedido(this.orige).subscribe({
      next(data){
        console.log(data);
        for (let i = 0; i < self.destinos.length; i++) {
         self.destinos[i].pedido_id=data.id;
          self.crear_destino(i,self.destinos[i]);
        }
      },error(err){
        console.log(err.error.err);
      }
    })
  }
  crear_destino(i,data){
    let self = this;
    this.api.crear_destino(data).subscribe({
      next(data){
        console.log(data);
        alert('Pedido creado!');
        self.router.navigate(['/estadoPedido']);
      },error(err){
        console.log(err.error.err);
      }
    })
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
    } 
  }
}
