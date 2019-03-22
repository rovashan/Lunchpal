import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MenuRoutingModule
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
