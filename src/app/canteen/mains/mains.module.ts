import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { MainsRoutingModule } from './mains-routing.module';
import { MainsComponent } from './mains.component';

@NgModule({
  imports: [
    SharedModule,
    MainsRoutingModule
  ],
  declarations: [MainsComponent]
})
export class MainsModule { }
