import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';

@NgModule({
  imports: [
    SharedModule,
    PlansRoutingModule
  ],
  declarations: [PlansComponent]
})
export class PlansModule { }
