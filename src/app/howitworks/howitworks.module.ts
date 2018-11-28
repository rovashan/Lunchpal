import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { HowitworksRoutingModule } from './howitworks-routing.module';
import { HowitworksComponent } from './howitworks.component';

@NgModule({
  imports: [
    SharedModule,
    HowitworksRoutingModule
  ],
  declarations: [HowitworksComponent]
})
export class HowitworksModule { }
