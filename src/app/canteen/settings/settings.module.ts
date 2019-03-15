import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
