import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared';
import { PaymentformRoutingModule } from './paymentform-routing.module';
import { PaymentformComponent } from './paymentform.component';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './shared/dateAdapter';

@NgModule({
  imports: [
    SharedModule,
    //NgbModule,
    PaymentformRoutingModule
  ],
  declarations: [PaymentformComponent],
  providers:[
    {provide: DateAdapter, useClass: CustomDateAdapter}
  ]
})
export class PaymentformModule { }
