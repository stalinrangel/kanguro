import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEstadoEcommerceComponent } from './pedido-estado-ecommerce.component';

describe('PedidoEstadoEcommerceComponent', () => {
  let component: PedidoEstadoEcommerceComponent;
  let fixture: ComponentFixture<PedidoEstadoEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoEstadoEcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEstadoEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
