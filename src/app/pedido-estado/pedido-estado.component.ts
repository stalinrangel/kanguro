import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-estado',
  templateUrl: './pedido-estado.component.html',
  styleUrls: ['./pedido-estado.component.css']
})
export class PedidoEstadoComponent implements OnInit {

  constructor(private api: ApiService, private uss: UserStorageService, private router: Router) { }

  ngOnInit(): void {
    let self = this;
    this.api.estado().subscribe({
      next(data){
        console.log(data);

      },error(err){
        console.log(err.error.err);
      }
    })
  }

}
