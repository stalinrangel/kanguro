import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  public id:any;
  public pedidos:any=[];
  elementType = 'svg';
  public value = '';
  format = 'CODE128';
  lineColor = '#000000';
  width = 3;
  height = 250;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 40;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  get values(): string[] {
    return this.value.split('\n');
  }
  codeList: string[] = [
    '', 'CODE128',
    'CODE128A', 'CODE128B', 'CODE128C',
    'UPC', 'EAN8', 'EAN5', 'EAN2',
    'CODE39',
    'ITF14',
    'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
    'pharmacode',
    'codabar'
  ];

  public data:any;
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
    this.api.pedido(id).subscribe({
      next(data){
        self.pedidos=data;
        self.data=self.pedidos[0].destinos;
        console.log(self.pedidos)
        console.log(self.data)
        self.data[0].acobrar=self.data[0].subtotal-self.data[0].descuento;
      },error(err){
        console.log(err);
      }
    })
  }

}
