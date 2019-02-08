import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {AfirestoreService} from "../afirestore.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(
      public authService: AuthService,
      private afirestore: AfirestoreService) { }
    
    //---- Below is the implementation for the sidenav

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
      
      }
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
    
    ngOnInit() {
      //changes on user subscription
      this.authService.userSubscriptionChanges.subscribe(x => this.userSubscription = x);
      //changes on user status
      this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    
    }


}
