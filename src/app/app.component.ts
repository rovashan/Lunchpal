import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
//onesignal service
import { OnesignalService } from "./onesignal/onesignal.service";
import { AuthService } from "./auth/auth.service";
import { AfirestoreService } from "./afirestore.service";
import { ShoppingcartService } from "./shoppingcart.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private notifications: OnesignalService,
   
  ) { }

  
  ngOnInit() {
 
    this.notifications.init();
  }
  ngOnDestroy(): void {
  
  }

}
