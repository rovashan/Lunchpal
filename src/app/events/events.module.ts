import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  declarations: [EventsComponent],
 
})
export class EventsModule { }
