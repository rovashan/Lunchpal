import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
//onesignal service
import {OnesignalService} from "./onesignal/onesignal.service";
import {AuthService} from "./auth/auth.service";
import {AfirestoreService} from "./afirestore.service";


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
    private afirestore: AfirestoreService
    ){}
  
  canteen:boolean = true;
  
  //checks url in order to show or hide the footer
  checkURL(){
    this.router.events.subscribe((x) => {
      if(!this.router.url.indexOf("/canteen")){
        this.canteen = false;
      } else {
        this.canteen = true;
      }
    });
  }

  x(){
    this.afirestore.collectionChanges().subscribe(x => {
      console.log(x);
    })
  }

  ngOnInit(){
    //init the OneSignal service
    //and check for changes
  
    this.x();

    this.authService.user.subscribe(user => {
      //console.log("checking user", user)
      if(user !== null){
        this.authService.userChanges();
      }
      
    });
  
  
    //this.router.navigate(["/canteen"]);
  

    //this.notifications.init();
    //this.notifications.updateChanges();
    this.checkURL();
    //this.authService.userChanges();
    
  }


}
