import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { RenewRoutingModule } from './renew-routing.module';
import { RenewComponent } from './renew.component';

@NgModule({
  imports: [
    SharedModule,
    RenewRoutingModule
  ],
  declarations: [RenewComponent]
})
export class RenewModule { }
