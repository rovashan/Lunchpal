import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';

@NgModule({
  imports: [
    SharedModule,
    PrivacyRoutingModule
  ],
  declarations: [PrivacyComponent]
})
export class PrivacyModule { }
