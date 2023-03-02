import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlComponent } from './xl.component';

describe('XlComponent', () => {
  let component: XlComponent;
  let fixture: ComponentFixture<XlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
