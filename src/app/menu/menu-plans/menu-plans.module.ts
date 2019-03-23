import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { MenuPlansRoutingModule } from './menu-plans-routing.module';
import { MenuPlansComponent } from './menu-plans.component';

@NgModule({
  imports: [
    SharedModule,
    MenuPlansRoutingModule
  ],
  declarations: [MenuPlansComponent]
})
export class MenuPlansModule { }
