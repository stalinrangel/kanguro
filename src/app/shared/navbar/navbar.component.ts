import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public show:any=0;
    public showWeb:any;
    public user: any;
    public id: any;
    public showApp:any=0;

    constructor(public location: Location, private router: Router, private uss: UserStorageService) {
        var mediaqueryList = window.matchMedia("(min-width: 992px)");
        if(mediaqueryList.matches) {
            this.showWeb = true;
        }
        this.user=this.uss.user;
        if(this.user){
            if (this.user.user.tipo_usuario == '1') {
                this.showApp = 0;
            } else {
                this.showApp = 1;
            }
        }
        console.log(this.showApp)
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    getUser(){
        this.user=this.uss.user;
        if(this.user){
            if (this.user.user.tipo_usuario == '1') {
                this.showApp = 0;
            } else {
                this.showApp = 1;
            }
        }
        console.log(this.showApp)
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    particular(){
        console.log('32')
        
            this.show=1;

    }
    ecommerce(){
        console.log('3s2')
            this.show=2;
        
    }
    cerrar(){
        this.show=0;
    }
}
