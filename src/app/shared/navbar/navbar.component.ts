import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { UserStorageService } from '../../services/user-storage.service';
import { SesionService } from 'src/app/services/sesion.service';

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
    public ensesion: any={name:null};
    public showMenuWeb: boolean = false;

    constructor(public location: Location, private router: Router, private uss: UserStorageService, private sesion: SesionService) {
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
        this.check()
        sesion.$emitter.subscribe(() => {
            this.check()
          });
    }

    check(){
        console.log(this.uss)
        this.user=this.uss.user;
        console.log(this.user)
        if(!this.user){
            this.ensesion={name:null};
            console.log(this.ensesion);
        }else if (this.user.user) {
            this.ensesion=this.user.user;
            console.log(this.ensesion);
            if (this.ensesion.tipo_usuario == '1') {
                this.showApp = 0;
            } else {
                this.showApp = 1;
            }
        }  
    }

    iniciar(){
        this.router.navigate(['/iniciar'])
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
        this.check();
        this.user=this.uss.user;
        if(this.user){
            if (this.user.user.tipo_usuario == '1') {
                this.showApp = 0;
            } else {
                this.showApp = 1;
            }
        }
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

    inicio(){
        this.showMenuWeb = false;
        this.router.navigate[('/landing')];
    }

    particular(){
        this.showMenuWeb = false;
        this.router.navigate[('/particular')];
    }

    ecommerce(){
        this.showMenuWeb = false;
        this.router.navigate[('/ecommerce')];
    }

    xl(){
        this.showMenuWeb = false;
        this.router.navigate[('/xl')];
    }

    realizarEnvio(i){
        this.showMenuWeb = false;
        if(i == 1){
            this.router.navigate[('/pedidoEcommerce')];
        } else {
            this.router.navigate[('/pedido')];
        }   
    }

    estadoEnvio(i){
        this.showMenuWeb = false;
        if(i == 1){
            this.router.navigate[('/estadoPedidoEcommerce')];
        } else {
            this.router.navigate[('/estadoPedido')];
        } 
    }

    historialEnvio(i){
        this.showMenuWeb = false;
         if(i == 1){
            this.router.navigate[('/historialPedidoEcommerce')];
        } else {
            this.router.navigate[('/historialPedido')];
        } 
    }

    reprogramarEnvio(){
        this.showMenuWeb = false;
        this.router.navigate[('/reprogramarEcommerce')];
    }

    misProductos(){
        this.showMenuWeb = false;
        this.router.navigate[('/producto')];
    }

    miCuenta(){
        this.showMenuWeb = false;
        this.router.navigate[('/miCuenta')];
    }

    cerrar(){
        this.ensesion.name = null;
        this.showMenuWeb = false;  
        this.uss.destroy();    
        this.router.navigate(['/iniciar']);      
    }
}
