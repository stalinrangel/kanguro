import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SectionsComponent } from './sections/sections.component';
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
import { PedidoEcommerceComponent } from './pedido-ecommerce/pedido-ecommerce.component';
import { PedidoEstadoEcommerceComponent } from './pedido-estado-ecommerce/pedido-estado-ecommerce.component';
import { PedidoHistorialEcommerceComponent } from './pedido-historial-ecommerce/pedido-historial-ecommerce.component';
import { PedidoReprogramarEcommerceComponent } from './pedido-reprogramar-ecommerce/pedido-reprogramar-ecommerce.component';
import { ProductoComponent } from './producto/producto.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { GuiasComponent } from './guias/guias.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { LiquidacionesComponent } from './liquidaciones/liquidaciones.component';

const routes: Routes =[
  { path: 'section',             component: SectionsComponent },
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'sucursal/:id',          component: SucursalComponent },
    { path: 'print/:id',             component: PrintComponent },
    { path: 'guia/:id',             component: GuiaComponent },
    { path: 'guias',             component: GuiasComponent },
    { path: 'liquidaciones',             component: LiquidacionesComponent },
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
    { path: 'pedidoEcommerce',          component: PedidoEcommerceComponent },
    { path: 'estadoPedidoEcommerce',          component: PedidoEstadoEcommerceComponent },
    { path: 'historialPedidoEcommerce',          component: PedidoHistorialEcommerceComponent },
    { path: 'reprogramarEcommerce',          component: PedidoReprogramarEcommerceComponent },
    { path: 'producto',          component: ProductoComponent },
    { path: 'addProducto',          component: AddProductoComponent },
    { path: 'terminos',          component: TerminosCondicionesComponent },
    { path: 'servicios',          component: ServiciosComponent },
    { path: 'nosotros',          component: NosotrosComponent },
    { path: 'recuperar/:id',          component: RecuperarComponent },
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
