import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentformComponent } from './paymentform.component';


const routes: Routes = [
  { path: '', component: PaymentformComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentformRoutingModule { }
