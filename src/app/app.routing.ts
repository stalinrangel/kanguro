import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { PrintComponent } from './print/print.component';
import { GuiaComponent } from './guia/guia.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { ParticularComponent } from './particular/particular.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component'; 
import { XlComponent } from './xl/xl.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoEstadoComponent } from './pedido-estado/pedido-estado.component';
import { PedidoHistorialComponent } from './pedido-historial/pedido-historial.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SesionComponent } from './sesion/sesion.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'sucursal/:id',          component: SucursalComponent },
    { path: 'print/:id',             component: PrintComponent },
    { path: 'guia/:id',             component: GuiaComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'particular',          component: ParticularComponent },
    { path: 'ecommerce',          component: EcommerceComponent },
    { path: 'xl',          component: XlComponent },
    { path: 'pedido',          component: PedidoComponent },
    { path: 'estadoPedido',          component: PedidoEstadoComponent },
    { path: 'historialPedido',          component: PedidoHistorialComponent },
    { path: 'miCuenta',          component: MiCuentaComponent },
    { path: 'contacto',          component: ContactoComponent },
    { path: 'registro',          component: RegistroComponent },
    { path: 'iniciar',          component: SesionComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
