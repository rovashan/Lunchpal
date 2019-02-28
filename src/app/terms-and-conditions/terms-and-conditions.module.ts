import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  imports: [
    SharedModule,
    TermsAndConditionsRoutingModule
  ],
  declarations: [TermsAndConditionsComponent]
})
export class TermsAndConditionsModule { }
