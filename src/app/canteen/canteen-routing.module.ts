import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanteenComponent } from './canteen.component';

const routes: Routes = [
  { path: '', component: CanteenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }
