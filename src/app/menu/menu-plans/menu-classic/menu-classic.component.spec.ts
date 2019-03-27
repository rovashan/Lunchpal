import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClassicComponent } from './menu-classic.component';

describe('MenuClassicComponent', () => {
  let component: MenuClassicComponent;
  let fixture: ComponentFixture<MenuClassicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuClassicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
