import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
//onesignal service
import { OnesignalService } from "./onesignal/onesignal.service";
import { AuthService } from "./auth/auth.service";
import { AfirestoreService } from "./afirestore.service";
import { ShoppingcartService } from "./shoppingcart.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private notifications: OnesignalService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private afirestore: AfirestoreService,
    private shoppingcartService: ShoppingcartService
  ) { }

  menu: boolean = false;
  lunchbox: boolean = false;
  dailyLimitSetting: boolean;
  routerEvent: Subscription;
  routerNavigation: Subscription;
  shoppingCartBasket: Subscription;
  shoppingCartTotal: Subscription;
  userSubscriptionEvent: Subscription;
  userAuth: Subscription;
  total: any = this.shoppingcartService.totalChange;
  userSubscription: any = this.authService.userSubscription;
  basketChange: any = this.shoppingcartService.emptyBasket;
  balanceTotal: any;

  showNavMenu;
  showLandingNav;

  //checks url in order to show or hide the footer
  checkURL() {
  this.routerEvent = this.router.events.subscribe((x) => {

      if (this.router.url.indexOf("/menu") === -1) {
        this.menu = false;
        this.showNavMenu = false;
        this.showLandingNav = true;

      } else {
        this.menu = true;
        this.showNavMenu = true;
        this.lunchbox = true;
        this.showLandingNav = false;

        if ((this.router.url.indexOf("/menu/thankyou") !== -1) ||
          (this.router.url.indexOf("/menu/order") !== -1) ||
          (this.router.url.indexOf("/menu/settings") !== -1)) {
          this.lunchbox = false;
        }

        if ((localStorage.getItem("cart") === null) && (localStorage.getItem("meal") === null)) {
          this.basketChange = false;
        }
      }


    });

  }
  ngOnInit() {
    
    //scroll to top after route navigation
   this.routerNavigation = this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.shoppingCartBasket = this.shoppingcartService.emptyBasketChange.subscribe(x => {
      this.basketChange = x;
    });


   this.userSubscriptionEvent = this.authService.userSubscriptionChanges.subscribe(x => {
      this.userSubscription = x;
      //console.log(x);

      if (this.menu) {
        this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
          this.dailyLimitSetting = settings['dailyLimit'];
          //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
        });
      }
    });

    this.shoppingCartTotal = this.shoppingcartService.totalChanges.subscribe(x => {
      this.total = x;
    })


    this.authService.userBalanceChanges.subscribe(x => {
      this.balanceTotal = x;
    })


    this.userAuth = this.authService.user.subscribe(user => {
    
      if (user !== null) {
        this.authService.userChanges();
        //getting the balance
        this.balanceTotal = this.authService.userBalance;
        console.log("User balance:", this.authService.userBalance);
        console.log("balanceTotal:", this.balanceTotal);
      }

    });

    this.notifications.init();
    this.checkURL();
   

  }
  ngOnDestroy(): void {
   this.shoppingCartTotal.unsubscribe();
   this.shoppingCartBasket.unsubscribe();
   this.routerEvent.unsubscribe();
   this.routerNavigation.unsubscribe();
   this.userAuth.unsubscribe();
   this.userSubscriptionEvent.unsubscribe(); 
  }

}
