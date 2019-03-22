import { Component, OnInit, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router, NavigationStart } from '@angular/router';
import { AfirestoreService } from '../afirestore.service';
import { ShoppingcartService } from '../shoppingcart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  dailyLimitSetting: boolean;
  limitPeriod: string;

  total: any = this.shoppingcartService.totalChange;


  constructor(
    public authService: AuthService,
    private afirestore: AfirestoreService,
    private router: Router,
    private shoppingcartService: ShoppingcartService

  ) { }


  hideNavbarLogin = false;

  //---- Below is the implementation for the sidenav

  canteen = false;
  //watch the sidenav
  @ViewChild('sidenav') menu: ElementRef;


  //check for click event to close the sidenav
  @HostListener("document:click", ["$event"])
  onClick(event) {
    if (event.target.closest(".sidenav") || event.target.closest(".icon")) {
      //console.log('event: ', event);
      return;
    } else {
      //console.log('close sidenav');
      this.menu.nativeElement.style.width = "0px";
    }

  }

  //check for resize event to hide the sidenav
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 599) {
      this.menu.nativeElement.style.width = "0px";
      this.hideNavbarLogin = false;
    } else {
      this.hideNavbarLogin = true;
    }
  }

  checkCanteen() {
    this.router.events.subscribe((x) => {

      //console.log('this.router.url: ', this.router.url);

      if (this.router.url.indexOf("/canteen") === -1) {
        this.canteen = false;
      } else {
        this.canteen = true;


        // this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
        //   this.dailyLimitSetting = settings['dailyLimit'];
        //   //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
        // });
      }
      //console.log('canteen: ', this.canteen);
    });
  }


  //---- End of implementation for the sidenav



  userSubscription = this.authService.userSubscription;
  userStatus = this.authService.userStatus;


  showMenu() {
    this.menu.nativeElement.style.width = "250px";
  }

  closeMenu() {
    this.menu.nativeElement.style.width = "";
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
    // close sidenav on router change
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        this.menu.nativeElement.style.width = "0px";
      }
    });

    //    this.getWindow();
    //changes on user subscription
    this.authService.userSubscriptionChanges.subscribe(x => {
      
      if (x) {
        this.userSubscription = x;

        if (this.canteen) {
            this.afirestore.getSettings(this.authService.userDocId).subscribe(settings => {
            this.dailyLimitSetting = settings['dailyLimit'];
            //console.log('dailyLimitSetting: ', this.dailyLimitSetting);
          });
        }
      }

 
      //console.log('userSubscription: ', this.userSubscription);

    })
    //changes on user status
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);

    this.shoppingcartService.totalChanges.subscribe(x => {
      this.total = x;
    })
    
    this.checkCanteen();
    /*
    if(this.browserWindow.innerWidth > 599){
      this.hideNavbarLogin = false;
    }else{
      this.hideNavbarLogin = true;
    }
*/

  }

  // ngOnChanges() {
  //   if (this.canteen) {
  //     console.log(': ', this.authService.userDocId);
  //   }
  // }

}
