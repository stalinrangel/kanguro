import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoHistorialComponent } from './pedido-historial.component';

describe('PedidoHistorialComponent', () => {
  let component: PedidoHistorialComponent;
  let fixture: ComponentFixture<PedidoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
