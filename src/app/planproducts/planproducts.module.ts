import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { PlanproductsRoutingModule } from './planproducts-routing.module';
import { PlanproductsComponent } from './planproducts.component';

@NgModule({
  imports: [
    SharedModule,
    PlanproductsRoutingModule
  ],
  declarations: [PlanproductsComponent]
})
export class PlanproductsModule { }
