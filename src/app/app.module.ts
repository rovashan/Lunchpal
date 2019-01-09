import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from './footer/footer.component';

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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule,
    AppRoutingModule,
  ],
  providers: [AuthService, AfirestoreService, OnesignalService, ShoppingcartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
