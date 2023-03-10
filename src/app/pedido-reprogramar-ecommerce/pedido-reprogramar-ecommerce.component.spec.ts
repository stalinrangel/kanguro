import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoReprogramarEcommerceComponent } from './pedido-reprogramar-ecommerce.component';

describe('PedidoReprogramarEcommerceComponent', () => {
  let component: PedidoReprogramarEcommerceComponent;
  let fixture: ComponentFixture<PedidoReprogramarEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoReprogramarEcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoReprogramarEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
