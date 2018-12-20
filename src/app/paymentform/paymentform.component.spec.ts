import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentformComponent } from './paymentform.component';

describe('PaymentformComponent', () => {
  let component: PaymentformComponent;
  let fixture: ComponentFixture<PaymentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
