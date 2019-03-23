import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GuardGuard} from "./auth/guard.guard";
import { HomeComponent } from './home/home.component';
import {PlansComponent} from "./plans/plans.component";
import {HowitworksComponent} from "./howitworks/howitworks.component";
import {MenuComponent} from "./menu/menu.component";
import {MainsComponent} from "./menu/mains/mains.component";
import {LoginComponent} from "./login/login.component";
import {IndexComponent} from "./menu/index/index.component";
import {DrinksComponent} from "./menu/drinks/drinks.component";

/*
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
 
  { path: 'menu', canActivate:[GuardGuard], loadChildren: './menu/menu.module#MenuModule'},
  
  { path: 'menu/mains', canActivate:[GuardGuard], loadChildren: './menu/mains/mains.module#MainsModule'},
  { path: 'menu/lightmeals', canActivate:[GuardGuard], loadChildren: './menu/lightmeals/lightmeals.module#LightmealsModule'},
  { path: 'menu/drinks', canActivate:[GuardGuard], loadChildren: './menu/drinks/drinks.module#DrinksModule'},
  { path: 'menu/snacks', canActivate:[GuardGuard], loadChildren: './menu/snacks/snacks.module#SnacksModule'},
  { path: 'menu/order', canActivate:[GuardGuard], loadChildren: './menu/order/order.module#OrderModule'},
  { path: 'menu/thankyou', canActivate:[GuardGuard], loadChildren: './menu/thankyou/thankyou.module#ThankyouModule'},
  { path: 'renew', canActivate:[GuardGuard], loadChildren: './renew/renew.module#RenewModule'},  
  { path: 'menu/settings', loadChildren: './menu/settings/settings.module#SettingsModule'},
  
  { path: 'terms-and-conditions', loadChildren: './terms-and-conditions/terms-and-conditions.module#TermsAndConditionsModule'},
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule'},
 
];
*/

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent},
  { path: 'plans',  component: PlansComponent},
  { path: 'howitworks',  component: HowitworksComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'menu', component: MenuComponent, children: [
    {path: "", component: IndexComponent},
    {path: "mains", component: MainsComponent},
    {path: "drinks", component: DrinksComponent}
  ]},
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
