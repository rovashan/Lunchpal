import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';


@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
