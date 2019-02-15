import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared';
import { PaymentformRoutingModule } from './paymentform-routing.module';
import { PaymentformComponent } from './paymentform.component';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './shared/dateAdapter';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    //NgbModule,
    PaymentformRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [PaymentformComponent],
  providers:[
    {provide: DateAdapter, useClass: CustomDateAdapter}
  ]
})
export class PaymentformModule { }
