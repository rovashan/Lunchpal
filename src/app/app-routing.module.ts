import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GuardGuard} from "./auth/guard.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansModule' },
  { path: 'howitworks', loadChildren: './howitworks/howitworks.module#HowitworksModule' },
  { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsModule' },
  { path: 'contactus', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'payment/:plan', canActivate:[GuardGuard], loadChildren: './paymentform/paymentform.module#PaymentformModule' },
  { path: 'canteen', canActivate:[GuardGuard], loadChildren: './canteen/canteen.module#CanteenModule'},
  { path: 'canteen/mains', canActivate:[GuardGuard], loadChildren: './menu/mains/mains.module#MainsModule'},
  { path: 'canteen/lightmeals', canActivate:[GuardGuard], loadChildren: './menu/lightmeals/lightmeals.module#LightmealsModule'},
  { path: 'canteen/drinks', canActivate:[GuardGuard], loadChildren: './menu/drinks/drinks.module#DrinksModule'},
  { path: 'canteen/snacks', canActivate:[GuardGuard], loadChildren: './menu/snacks/snacks.module#SnacksModule'},
  { path: 'canteen/order', canActivate:[GuardGuard], loadChildren: './menu/order/order.module#OrderModule'},
  { path: 'canteen/thankyou', canActivate:[GuardGuard], loadChildren: './menu/thankyou/thankyou.module#ThankyouModule'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
