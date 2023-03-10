import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xl',
  templateUrl: './xl.component.html',
  styleUrls: ['./xl.component.scss']
})
export class XlComponent implements OnInit {

  showWeb: boolean = false;

  constructor() { 
    var mediaqueryList = window.matchMedia("(min-width: 992px)");
    if(mediaqueryList.matches) {
      this.showWeb = true;
    }
  }

  ngOnInit(): void {
  }

}
