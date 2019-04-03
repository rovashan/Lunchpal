import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdialogComponent } from './orderdialog.component';

describe('OrderdialogComponent', () => {
  let component: OrderdialogComponent;
  let fixture: ComponentFixture<OrderdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
