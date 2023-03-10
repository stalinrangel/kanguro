import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEcommerceComponent } from './pedido-ecommerce.component';

describe('PedidoEcommerceComponent', () => {
  let component: PedidoEcommerceComponent;
  let fixture: ComponentFixture<PedidoEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoEcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
