import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { MenuPlansRoutingModule } from './menu-plans-routing.module';
import { MenuPlansComponent } from './menu-plans.component';
import { MenuVeggieComponent } from './menu-veggie/menu-veggie.component';
import { MenuClassicComponent } from './menu-classic/menu-classic.component';
import { MenuLifestyleComponent } from './menu-lifestyle/menu-lifestyle.component';

@NgModule({
  imports: [
    SharedModule,
    MenuPlansRoutingModule
  ],
  declarations: [MenuPlansComponent, MenuVeggieComponent, MenuClassicComponent, MenuLifestyleComponent]
})
export class MenuPlansModule { }
