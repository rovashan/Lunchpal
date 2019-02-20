import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { SnacksRoutingModule } from './snacks-routing.module';
import { SnacksComponent } from './snacks.component';

@NgModule({
  imports: [
    SharedModule,
    SnacksRoutingModule
  ],
  declarations: [SnacksComponent]
})
export class SnacksModule { }
