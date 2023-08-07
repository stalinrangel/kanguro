import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  closeResult: string;
  public password:any='';
  public password1:any='';
  public password2:any='';
  public id:any='';
  public model:any={
    email:this.id,
    password:this.password1,
    password1:this.password1,
    password2:this.password2
  };
  public isDanger=false;
  public isInfo=false;
  

  constructor(private activatedRoute: ActivatedRoute,private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router, private sesion:SesionService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
    });
  }

  open(content, type) {
    console.log(type)
    if(type == 'confirm'){
      this.modalService.open(content, { windowClass: 'modal-confirm', centered: true, backdrop: false }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {      
      });
    } 
  }

  danger(){
    this.isDanger=true;
    let self = this;
    setTimeout(() => {
      self.isDanger=false
    }, 3000);
  }
  info(){
    this.isInfo=true;
    let self = this;
    setTimeout(() => {
      self.isInfo=false
    }, 3000);
  }
  restablecer(){
    if (this.model.password1==this.model.password2) {
      this.model.email=this.id;
      this.model.password=this.model.password1;
      let self=this;
      this.api.recuperar(this.model).subscribe({
        next(data){
          self.router.navigate(['/iniciar']);
        },error(err){
          console.log(err);
          alert('Error!')
        }
      })
    }else{
      alert('Las contraseñas no coinciden');
    }
  }

}
