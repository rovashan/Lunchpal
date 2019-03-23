import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { FooterComponent } from './footer/footer.component';
import {NavComponent} from "./nav/nav.component";
//firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

//custom firebase services
import {AuthService} from "./auth/auth.service";
import {AfirestoreService} from "./afirestore.service";

//onesignal notifications service
import {OnesignalService} from "./onesignal/onesignal.service";

//shopingcart service
import {ShoppingcartService} from "./shoppingcart.service";
//Google Places Autocomplete
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { PaymentService } from './paymentform/shared/payment.service';
import { HttpClientModule } from '@angular/common/http';
//moment js
import { MomentModule } from 'ngx-moment';
import { ApiService } from './api.service';
import { LandingnavComponent } from './landingnav/landingnav.component';

import {MaterialModule} from "./shared/material/material.module";
import {MenuComponent} from "./menu/menu.component";
import { SharedModule } from './shared/shared.module';
import { IndexComponent } from './menu/index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LandingnavComponent,
    MenuComponent,
   
    IndexComponent,
   
  ],
  imports: [
   SharedModule,
  
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    GooglePlaceModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [AuthService, AfirestoreService, OnesignalService, ShoppingcartService, PaymentService, ApiService],
  bootstrap: [AppComponent],
 
  
})
export class AppModule { }
