import { Component, OnInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router, NavigationStart } from '@angular/router';
import { AfirestoreService } from '../afirestore.service';
import { ShoppingcartService } from '../shoppingcart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  dailyLimitSetting: boolean;
  limitPeriod: string;

  total: any = this.shoppingcartService.totalChange;


  constructor(
    public authService: AuthService,
    private afirestore: AfirestoreService,
    private router: Router,
    private shoppingcartService: ShoppingcartService

  ) { }

  routerEvent: Subscription;
  userAuth: Subscription;
  userSubscriptionEvent: Subscription;
  routerNavigation: Subscription;
  shoppingCartSubscription: Subscription;
  hideNavbarLogin = false;
  
  user;

  //---- Below is the implementation for the sidenav

  menu = false;
  //watch the sidenav
  @ViewChild('sidenav') sidenav: ElementRef;


  //check for click event to close the sidenav
  @HostListener("document:click", ["$event"])
  onClick(event) {
    if (event.target.closest(".sidenav") || event.target.closest(".icon")) {
      //console.log('event: ', event);
      return;
    } else {
      //console.log('close sidenav');
      this.sidenav.nativeElement.style.width = "0px";
    }

  }

  //check for resize event to hide the sidenav
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 599) {
      this.sidenav.nativeElement.style.width = "0px";
      this.hideNavbarLogin = false;
    } else {
      this.hideNavbarLogin = true;
    }
  }

  /*
  checkMenu() {
   this.routerEvent= this.router.events.subscribe((x) => {

      console.log('this.router.url: ', this.router.url);

      if (this.router.url.indexOf("/menu") === -1) {
        this.menu = false;
      } else {
        this.menu = true;


        // this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
        //   this.dailyLimitSetting = settings['dailyLimit'];
        //   //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
        // });
      }
      //console.log('menu: ', this.menu);
    });
  }
*/

  //---- End of implementation for the sidenav



  userSubscription = this.authService.userSubscription;
  userStatus = this.authService.userStatus;
  balanceTotal:any = this.authService.userBalance;

  showMenu() {
    this.sidenav.nativeElement.style.width = "250px";
  }

  closeMenu() {
    this.sidenav.nativeElement.style.width = "";
  }

  //logout function from AuthService
  logout(event: Event) {
    event.preventDefault();
    this.authService.logOut();
  }

  /*
  //get the window obj
  getWindow(){
    this.browserWindow = window;
  }    
*/
  ngOnInit() {

    
    this.authService.userBalanceChanges.subscribe(x => {
      this.balanceTotal = x;
      console.log("balance Total", x)
      
      console.log("balance Total", this.balanceTotal)
    })



    // close sidenav on router change
   this.routerNavigation = this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        this.sidenav.nativeElement.style.width = "0px";
      }
    });

    //    this.getWindow();
    //changes on user subscription
    this.userAuth = this.authService.userSubscriptionChanges.subscribe(x => {
      
      if (x) {
        this.userSubscription = x;

        if (this.menu) {
            this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
            this.dailyLimitSetting = settings['dailyLimit'];
            //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
          });
        }
      }

 
      //console.log('userSubscription: ', this.userSubscription);

    })
    //changes on user status
   this.userSubscriptionEvent = this.authService.userStatusChanges.subscribe(x => this.userStatus = x);

   
   this.shoppingCartSubscription = this.shoppingcartService.totalChanges.subscribe(x => {
      this.total = x;
    })
   
   //this.checkMenu();
    /*
    if(this.browserWindow.innerWidth > 599){
      this.hideNavbarLogin = false;
    }else{
      this.hideNavbarLogin = true;
    }
*/ this.authService.user.subscribe(user => {
  if (user) {
    this.user = true;
    console.log('this.user = true');
  } else {
    this.user = false 
    console.log('this.user = false');
  }
});

  }

 
  ngOnDestroy(){
    this.userAuth.unsubscribe();
    this.userSubscriptionEvent.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
    /*
    this.routerEvent.unsubscribe();
   
    this.routerNavigation.unsubscribe();
   
   
  */
  }
}
