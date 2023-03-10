import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEstadoComponent } from './pedido-estado.component';

describe('PedidoEstadoComponent', () => {
  let component: PedidoEstadoComponent;
  let fixture: ComponentFixture<PedidoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
