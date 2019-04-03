import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatererComponent } from './caterer.component';

const routes: Routes = [
  { path: '', component: CatererComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatererRoutingModule { }
