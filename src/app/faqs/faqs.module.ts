import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared';
import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsComponent } from './faqs.component';

@NgModule({
  imports: [
    SharedModule,
    FaqsRoutingModule
  ],
  declarations: [FaqsComponent]
})
export class FaqsModule { }
