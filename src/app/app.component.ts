import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {

  constructor(
    private notifications: OnesignalService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private afirestore: AfirestoreService,
    private shoppingcartService: ShoppingcartService
  ) { }

  canteen: boolean = true;
  lunchbox: boolean = false;
  total: any = this.shoppingcartService.totalChange;
  userSubscription: any = this.authService.userSubscription;
  basketChange: any = this.shoppingcartService.emptyBasket;

  //checks url in order to show or hide the footer
  checkURL() {
    this.router.events.subscribe((x) => {

      // if(!this.router.url.indexOf("/canteen")){
      //   this.canteen = false;
      // } else {
      //   this.canteen = true;
      // }

      if (this.router.url.indexOf("/canteen") === -1) {
        this.canteen = false;



      } else {
        this.canteen = true;
      }
      if ((localStorage.getItem("cart") === null)) {
        this.basketChange = false;
      }

    });

    this.router.events.subscribe((x) => {




      // if (!this.router.url.indexOf("/canteen")) {
      //   this.lunchbox = true;
      // } else {
      //   this.lunchbox = false;
      // }

      if (this.router.url.indexOf("/canteen") !== -1) {
        this.lunchbox = true;

        if ((this.router.url.indexOf("/canteen/thankyou") !== -1) ||
          (this.router.url.indexOf("/canteen/order") !== -1)) {

          this.lunchbox = false;
        }
      }

      // if ( (this.router.url.indexOf("/canteen") !== -1)  || 
      //      (this.router.url.indexOf("/canteen/thankyou") === -1) ||
      //      (this.router.url.indexOf("/canteen/order") === -1)  ) {
      //   this.lunchbox = false;
      // } else {
      //   this.lunchbox = true;
      // }





      // if (!this.router.url.indexOf("/canteen/order")) {
      //   this.lunchbox = false;
      // }
    });


  }
  /*
    x(){
      this.afirestore.collectionChanges().subscribe(x => {
        console.log(x);
      })
    }
  */
  ngOnInit() {
    //scroll to top after route navigation
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.shoppingcartService.emptyBasketChange.subscribe(x => {
      this.basketChange = x;
    });


    this.authService.userSubscriptionChanges.subscribe(x => {
      this.userSubscription = x;
      //console.log(x);
    });
    this.shoppingcartService.totalChanges.subscribe(x => {
      this.total = x;
    })


    this.authService.user.subscribe(user => {
      //console.log("checking user", user)
      if (user !== null) {
        this.authService.userChanges();
      }

    });


    //this.router.navigate(["/canteen"]);


    this.notifications.init();
    //this.notifications.updateChanges();
    this.checkURL();
    //this.authService.userChanges();

  }


}
