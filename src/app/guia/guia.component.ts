import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent implements OnInit {

  public id:any;
  public guia:any=[];
  public value = '';

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
      this.value = params.get('id');
      console.log(this.id);
      this.getDatos();
    });
  }
  getDatos(){
    let self:any=this;
    setTimeout(() => {
      self.pedido(self.id);
    }, 50);
  }
  pedido(id){
    let self=this;
    this.api.guia(id).subscribe({
      next(data){
        self.guia=data.guia;
        self.guia.productos=JSON.parse(self.guia.productos);
        console.log(self.guia)
      },error(err){
        console.log(err);
      }
    })
  }
}
