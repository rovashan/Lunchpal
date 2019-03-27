import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLifestyleComponent } from './menu-lifestyle.component';

describe('MenuLifestyleComponent', () => {
  let component: MenuLifestyleComponent;
  let fixture: ComponentFixture<MenuLifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLifestyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
