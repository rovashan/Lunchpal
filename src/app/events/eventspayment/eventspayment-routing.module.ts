import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventspaymentComponent } from './eventspayment.component'


const routes: Routes = [
  { path: '', component: EventspaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventspaymentRoutingModule { }
