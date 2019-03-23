import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPlansComponent } from './menu-plans.component';

const routes: Routes = [
  { path: '', component: MenuPlansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPlansRoutingModule { }
