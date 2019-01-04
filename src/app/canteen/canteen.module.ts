import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { CanteenRoutingModule } from './canteen-routing.module';
import { CanteenComponent } from './canteen.component';

@NgModule({
  imports: [
    SharedModule,
    CanteenRoutingModule
  ],
  declarations: [CanteenComponent]
})
export class CanteenModule { }
