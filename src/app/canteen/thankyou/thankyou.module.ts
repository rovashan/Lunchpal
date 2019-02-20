import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { ThankyouRoutingModule } from './thankyou-routing.module';
import { ThankyouComponent } from './thankyou.component';

@NgModule({
  imports: [
    SharedModule,
    ThankyouRoutingModule
  ],
  declarations: [ThankyouComponent]
})
export class ThankyouModule { }
