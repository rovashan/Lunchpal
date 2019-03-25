import { Component, OnInit, OnDestroy } from '@angular/core';

//authservice
import { AuthService } from "../auth/auth.service";
import { AfirestoreService } from "../afirestore.service";
import { ShoppingcartService } from "../shoppingcart.service";
import { Subscription } from 'rxjs';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private afirestore: AfirestoreService,
    private shoppingcartService: ShoppingcartService) { }

  user = false;
  username = this.authService.userFullName;
  userStatus = this.authService.userStatus;
  lunchbox: boolean;
  // dailyLimitSetting: boolean;
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
  menu: boolean = false;


  checkURL() {
    this.routerEvent = this.router.events.subscribe((x) => {

      // if ((this.router.url.indexOf("/menu/thankyou") !== -1) ||
      //   (this.router.url.indexOf("/menu/order") !== -1) ||
      //   (this.router.url.indexOf("/menu/settings") !== -1)) {
      //   this.lunchbox = false;

      // }

      if (this.router.url.indexOf("/menu") === -1) {

        // this.menu = false;
        this.lunchbox = false;
        console.log(this.router.url, this.lunchbox)
      } else {
        //this.menu = true;
        this.lunchbox = true;
        console.log(this.router.url, this.lunchbox)


      }

      if ((localStorage.getItem("cart") === null)) {
        this.basketChange = false;
        console.log('this.basketChange: ', this.basketChange);

      }



    });

  }


  ngOnInit() {
    console.log("oninit", this.router.url, this.lunchbox)
    if (this.lunchbox === undefined) {
      this.lunchbox = true;
    }
    /**
        this.authService.userBalanceChanges.subscribe(x => {
          this.balanceTotal = x;
        })
     */

    //scroll to top after route navigation
    this.routerNavigation = this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.shoppingCartBasket = this.shoppingcartService.emptyBasketChange.subscribe(x => {
      this.basketChange = x;
      //console.log('this.basketChange: ', this.basketChange);

      if ((localStorage.getItem("cart") === null)) {
        this.basketChange = false;
        console.log('this.basketChange: ', this.basketChange);
      }
    });


    this.userSubscriptionEvent = this.authService.userSubscriptionChanges.subscribe(x => {
      this.userSubscription = x;
      //console.log(x);

      // if (this.menu) {
      //   this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
      //     this.dailyLimitSetting = settings['dailyLimit'];
      //     //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
      //   });
      // }
    });

    this.shoppingCartTotal = this.shoppingcartService.totalChanges.subscribe(x => {
      this.total = x;
    })



    this.authService.user.subscribe(user => {
      if (user) {
        this.user = true;
        // console.log(user);
      } else {
        this.user = false
        //console.log(user);
      }
    });

    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);

    this.authService.userFullNameChanges.subscribe(x => this.username = x);
    this.checkURL();
    this.authService.userChanges();
  }

  ngOnDestroy() {

  }
}
