import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';

@NgModule({
  imports: [
    SharedModule,
    EventsRoutingModule
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
