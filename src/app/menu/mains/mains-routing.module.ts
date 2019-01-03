import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainsComponent } from './mains.component';

const routes: Routes = [
  { path: '', component: MainsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainsRoutingModule { }
