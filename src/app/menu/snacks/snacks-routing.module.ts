import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnacksComponent } from './snacks.component';

const routes: Routes = [
  { path: '', component: SnacksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnacksRoutingModule { }
