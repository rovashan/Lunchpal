import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { LightmealsRoutingModule } from './lightmeals-routing.module';
import { LightmealsComponent } from './lightmeals.component';

@NgModule({
  imports: [
    SharedModule,
    LightmealsRoutingModule
  ],
  declarations: [LightmealsComponent]
})
export class LightmealsModule { }
