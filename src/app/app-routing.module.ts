import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GuardGuard} from "./auth/guard.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansModule' },
  { path: 'howitworks', loadChildren: './howitworks/howitworks.module#HowitworksModule' },
  { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'payment/:plan', canActivate:[GuardGuard], loadChildren: './paymentform/paymentform.module#PaymentformModule' },
  { path: 'canteen', canActivate:[GuardGuard], loadChildren: './canteen/canteen.module#CanteenModule'},
  { path: 'canteen/mains', canActivate:[GuardGuard], loadChildren: './canteen/mains/mains.module#MainsModule'},
  { path: 'canteen/lightmeals', canActivate:[GuardGuard], loadChildren: './canteen/lightmeals/lightmeals.module#LightmealsModule'},
  { path: 'canteen/drinks', canActivate:[GuardGuard], loadChildren: './canteen/drinks/drinks.module#DrinksModule'},
  { path: 'canteen/snacks', canActivate:[GuardGuard], loadChildren: './canteen/snacks/snacks.module#SnacksModule'},
  { path: 'canteen/order', canActivate:[GuardGuard], loadChildren: './canteen/order/order.module#OrderModule'},
  { path: 'canteen/thankyou', canActivate:[GuardGuard], loadChildren: './canteen/thankyou/thankyou.module#ThankyouModule'},
  { path: 'renew', canActivate:[GuardGuard], loadChildren: './renew/renew.module#RenewModule'},  
  { path: 'terms-and-conditions', canActivate:[GuardGuard], loadChildren: './terms-and-conditions/terms-and-conditions.module#TermsAndConditionsModule'},
  { path: 'privacy', canActivate:[GuardGuard], loadChildren: './privacy/privacy.module#PrivacyModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
