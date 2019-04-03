import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { CatererRoutingModule } from './caterer-routing.module';
import { CatererComponent } from './caterer.component';


@NgModule({
  imports: [
    SharedModule,
    CatererRoutingModule,
    
  ],
  declarations: [CatererComponent],

})
export class CatererModule { }
