import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { PaymentformRoutingModule } from './paymentform-routing.module';
import { PaymentformComponent } from './paymentform.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentformRoutingModule
  ],
  declarations: [PaymentformComponent]
})
export class PaymentformModule { }
