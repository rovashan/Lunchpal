import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventspaymentComponent } from './eventspayment.component';

describe('EventspaymentComponent', () => {
  let component: EventspaymentComponent;
  let fixture: ComponentFixture<EventspaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventspaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
