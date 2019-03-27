import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVeggieComponent } from './menu-veggie.component';

describe('MenuVeggieComponent', () => {
  let component: MenuVeggieComponent;
  let fixture: ComponentFixture<MenuVeggieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVeggieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVeggieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
