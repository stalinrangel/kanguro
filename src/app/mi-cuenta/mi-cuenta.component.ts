import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public user:any;
  private id;
  constructor(private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.uss)
    this.user=this.user;
  }

  getInfo(){
    let self = this;
    this.api.signup(this.id).subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err.error.err);
      }
    })
  }
}
