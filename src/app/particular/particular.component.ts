import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit {

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
