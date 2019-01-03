import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanproductsComponent } from './planproducts.component';

describe('PlanproductsComponent', () => {
  let component: PlanproductsComponent;
  let fixture: ComponentFixture<PlanproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
