import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(
      public authService: AuthService,
      private router: Router,
    ) { }
    

    hideNavbarLogin = false;
  
    //---- Below is the implementation for the sidenav

    canteen;
    //watch the sidenav
    @ViewChild('sidenav') menu: ElementRef;


    //check for click event to close the sidenav
    @HostListener("document:click", ["$event"])
    onClick(event){
        if(event.target.closest(".sidenav") || event.target.closest(".icon")){
          return;
        }else{
            this.menu.nativeElement.style.width = "0px";       
        }

    }

    //check for resize event to hide the sidenav
    @HostListener('window:resize', ['$event'])
     onResize(event){
      if(event.target.innerWidth > 599){
        this.menu.nativeElement.style.width = "0px";
        this.hideNavbarLogin = false;
      }else{
        this.hideNavbarLogin = true;
      }
    }

   checkCanteen(){
    this.router.events.subscribe((x) => {
      if(!this.router.url.indexOf("/canteen")){
        this.canteen = false;
      } else {
        this.canteen = true;
      }
    });
   }

   
   //---- End of implementation for the sidenav
    
   
   
    userSubscription = this.authService.userSubscription;
    userStatus = this.authService.userStatus;
    

    showMenu(){
      this.menu.nativeElement.style.width = "250px";
    }

    closeMenu(){
      this.menu.nativeElement.style.width = "";
    }

    //logout function from AuthService
    logout(event: Event){
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
  //    this.getWindow();
      //changes on user subscription
      this.authService.userSubscriptionChanges.subscribe(x => this.userSubscription = x);
      //changes on user status
      this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    this.checkCanteen();
      /*
      if(this.browserWindow.innerWidth > 599){
        this.hideNavbarLogin = false;
      }else{
        this.hideNavbarLogin = true;
      }
*/

    }

    
}
