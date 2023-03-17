import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {Location} from '@angular/common';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss']
})
export class AddProductoComponent implements OnInit {

  public model:any={
    nombre:'',
    descripcion:'',
    categoria:'',
    modelo:'',
    medidas:'',
    cantidad: '',
    color: '#0CFF24',
    nombre_color: '',
    user_id: ''
  };

  user:any;
  id:any;
  serviceForm;
  photo: any;
  photoUrl: any;
  public alerts: any;
  showAlert: boolean = false;

  constructor(private modalService: NgbModal,
    private api: ApiService, 
    private uss: UserStorageService, 
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.user=this.uss.user;
    this.id=this.user.user.id;

    this.serviceForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['1'],
      modelo: ['', Validators.required],
      medidas: ['', Validators.required],
      cantidad: ['', Validators.required],
      color: ['', Validators.required],
      nombre_color: ['', Validators.required],
      user_id: [this.id, Validators.required],
      precio: ['', Validators.required]
    }, { updateOn: 'submit' });
  }

  open(content, type) {
    if(type == 'add'){
      this.modalService.open(content, { windowClass: 'modal-add', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    }
  }

  takePicture2(event){
    const input = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.photo = event.target.result;
      let file : File = input;
      this.photoUrl = file;
    }
    
    reader.readAsDataURL(event.target.files[0]);
  }

  close() {
    this.showAlert = false;
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  addProduct(serviceForm){
    console.log(serviceForm.value)
    console.log(serviceForm.valid)
    if (serviceForm.valid) {
      console.log(serviceForm.value)
      this.saveProduct();
    } else {
      this.showAlert = true;
    }
  }

  saveProduct(){
    let self = this;
    let data = {
      descripcion: this.serviceForm.value.descripcion,
      nombre: this.serviceForm.value.nombre,
      user_id: this.id
    }
    this.api.add_producto(data).subscribe({
      next(data){
        console.log(data);
        if (data.id) {
          self.uploadPhoto(data.id);
        }      
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  uploadPhoto(id){
    let self = this;
    let formData = new FormData();
    formData.append("file", this.photoUrl);
    this.api.subir_imagen(formData).subscribe({
      next(data){
        console.log(data);
        if (data) {
          self.saveColor(id,data);
        }  
      },error(err){
        console.log(err.error.text);
        self.saveColor(id,err.error.text);
      }
    })
  }

  saveColor(id,imagen){
    let self = this;
    let data = {
      color: this.serviceForm.value.color,
      imagen: imagen,
      nombrecolor: this.serviceForm.value.nombre_color,
      producto_id: id
    }
    console.log(data)
    this.api.add_color(data).subscribe({
      next(data){
        console.log(data);
        if (data.id) {
          self.saveAtribute(id, data.id)
        } 
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  saveAtribute(id, color_id){
    let self = this;
    let data = {
      atributo: this.serviceForm.value.medidas,
      cantidad: this.serviceForm.value.cantidad,
      nombrecolor: this.serviceForm.value.nombre_color,
      color_id: color_id,
      pedido_id: id,
      precio: this.serviceForm.value.precio
    }
    console.log(data)
    this.api.add_atributo(data).subscribe({
      next(data){
        console.log(data);
        //this.router.navigate(['/producto']);
        this.location.back();
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  goBack(){
    this.location.back();
  }
  

}
