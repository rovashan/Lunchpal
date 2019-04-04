import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { EventspaymentRoutingModule } from './eventspayment-routing.module';
import { EventspaymentComponent } from './eventspayment.component';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './shared/dateAdapter';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    //NgbModule,
    EventspaymentRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [EventspaymentComponent],
  providers:[
    {provide: DateAdapter, useClass: CustomDateAdapter}
  ]
})
export class EventspaymentModule { }
