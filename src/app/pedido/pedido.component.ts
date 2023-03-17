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
  public km: any='';
  public directionsRenderer = new google.maps.DirectionsRenderer();
  public directionsService = new google.maps.DirectionsService();

  public origen:any={
    'tipo':'',
    'fecha':'',
    'hora':'',
    'horario':'',
    'estado':'',
    'nombre':'',
    'forma_pago': '',
    'costo':'',
    'costo_recojo': '',
    'km':'',
    'min':'',
    'cajap':'',
    'cajam':'',
    'cajag':'',
    'cancelado':'',
    'reprogramado':0,
    'tipo_usuario':'',
    'nombre_origen':'',
    'origen':'',
    'departamento_origen':'',
    'distrito_origen':'',
    'telefono_origen':'',
    'comentarios':''
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
    'costo':'',
    'cantidad':'',
    'detalle':'',
    'subtotal':'',
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
    //this.initMap();
   
    this.getDate();
  }

  initDatos(){

    //Inicio Origen
    this.origen.tipo='URGENTE';
    this.origen.fecha=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate()+' '+this.fecha.getHours()+':'+'00'+':'+'00';
    this.origen.estado=0;
    this.origen.nombre=this.user.name;
    this.origen.tipo_usuario=this.user.tipo_usuario;

    this.destinos.push(this.destino);
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
    this.center = { lat: 41.3887900, lng: 2.1589900 };

    const defaultBounds = {
      north: this.center.lat + 0.1,
      south: this.center.lat - 0.1,
      east: this.center.lng + 0.1,
      west: this.center.lng - 0.1,
    };
    // The map, centered at Uluru
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: this.center,
    });
    // The marker, positioned at Uluru
    /*const marker = new google.maps.Marker({
      position: center,
      map: this.map,
    });*/
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const input2 = document.getElementById("pac-input2") as HTMLInputElement;
    
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "es" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    this.autocomplete[0] = new google.maps.places.Autocomplete(input, options);
    this.autocomplete[1] = new google.maps.places.Autocomplete(input2, options);
    this.places = new google.maps.places.PlacesService(this.map);
    this.directionsRenderer.setMap(this.map);
    let self=this;
    
    console.log(this.autocomplete)
    //this.autocomplete.addListener('place_changed',{})
  } 
  onPlaceChanged(i):any {
    const place = this.autocomplete[i].getPlace();
    console.log(place)
    if (place.geometry && place.geometry.location) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.set_markers(place.geometry.location);
    } else {
      (document.getElementById("autocomplete") as HTMLInputElement).placeholder =
        "Enter a city";
    }
  }
  set_markers(val){
    console.log(val)
    
    const marker = new google.maps.Marker({
      position: val,
      map: this.map,
    });
    this.markers.push(marker)
  }
  ver(i){
    console.log(i)
    let self=this;
    setTimeout(function(){
      console.log(self.autocomplete[i].getPlace())
      self.autocomplete[i].addListener("place_changed", self.onPlaceChanged(i));
    }, 800);
  }
  traceRoute(){
    
    this.calculateAndDisplayRoute(this.directionsService,this.directionsRenderer);
    this.calculekm();
  }
  calculekm(){
    var n=this.markers.length;
    console.log(n);
    this.km=this.haversine_distance(this.markers[0],this.markers[1]);
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
    alert(d)
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
    } 
  }
}
