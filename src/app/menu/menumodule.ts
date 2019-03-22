import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    SharedModule,
    MenuRoutingModule
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
