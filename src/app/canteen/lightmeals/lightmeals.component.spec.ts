import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightmealsComponent } from './lightmeals.component';

describe('LightmealsComponent', () => {
  let component: LightmealsComponent;
  let fixture: ComponentFixture<LightmealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightmealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightmealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
