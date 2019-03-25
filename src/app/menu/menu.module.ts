import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { MenuRoutingModule } from './menu-routing.module';
//import { MenuPlansComponent } from './menu-plans/menu-plans.component';

@NgModule({
  imports: [
    SharedModule,
    MenuRoutingModule
  ],
  declarations: []
})
export class MenuModule { }
