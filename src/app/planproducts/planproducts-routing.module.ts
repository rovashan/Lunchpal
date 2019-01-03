import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanproductsComponent } from './planproducts.component';

const routes: Routes = [
  { path: '', component: PlanproductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanproductsRoutingModule { }
