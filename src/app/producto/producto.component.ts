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
  public user:any;
  constructor(private modalService: NgbModal,private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
    this.user=this.uss.user;
    this.user=this.user.user;
    console.log(this.user)
    this.init();
  }

  init(){
    let self = this;
    this.api.inventario(this.user.id).subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err.error.err);
      }
    })
  }

  open(content, type) {
    if(type == 'add'){
      this.modalService.open(content, { windowClass: 'modal-add', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    } else if(type == 'color'){
      this.modalService.open(content, { windowClass: 'modal-color', centered: true, backdrop: false }).result.then((result) => {
      }, (reason) => {      
      });
    }
  }

}
