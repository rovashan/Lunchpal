import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { DrinksRoutingModule } from './drinks-routing.module';
import { DrinksComponent } from './drinks.component';

@NgModule({
  imports: [
    SharedModule,
    DrinksRoutingModule
  ],
  declarations: [DrinksComponent]
})
export class DrinksModule { }
