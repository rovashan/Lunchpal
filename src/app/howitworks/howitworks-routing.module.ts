import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowitworksComponent } from './howitworks.component';

const routes: Routes = [
  { path: '', component: HowitworksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowitworksRoutingModule { }
