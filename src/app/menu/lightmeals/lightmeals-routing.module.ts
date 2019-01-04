import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightmealsComponent } from './lightmeals.component';

const routes: Routes = [
  { path: '', component: LightmealsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightmealsRoutingModule { }
