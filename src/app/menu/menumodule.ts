import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { CanteenRoutingModule } from './menu-routing.module';
import { CanteenComponent } from './menu.component';

@NgModule({
  imports: [
    SharedModule,
    CanteenRoutingModule
  ],
  declarations: [CanteenComponent]
})
export class CanteenModule { }
