import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PrintComponent } from './print/print.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxPrintModule } from 'ngx-print';
import { GuiaComponent } from './guia/guia.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { ParticularComponent } from './particular/particular.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { XlComponent } from './xl/xl.component';
import { PedidoComponent } from './pedido/pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    PrintComponent,
    GuiaComponent,
    SucursalComponent,
    ParticularComponent,
    EcommerceComponent,
    XlComponent,
    PedidoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    NgxBarcodeModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
