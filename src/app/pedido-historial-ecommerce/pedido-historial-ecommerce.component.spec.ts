import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoHistorialEcommerceComponent } from './pedido-historial-ecommerce.component';

describe('PedidoHistorialEcommerceComponent', () => {
  let component: PedidoHistorialEcommerceComponent;
  let fixture: ComponentFixture<PedidoHistorialEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoHistorialEcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoHistorialEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
