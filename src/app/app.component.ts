import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
//onesignal service
import {OnesignalService} from "./onesignal/onesignal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notifications: OnesignalService, private location: Location, private router: Router){}
  
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


  ngOnInit(){
    //init the OneSignal service
    //and check for changes
    this.notifications.init();
    this.notifications.updateChanges();
    this.checkURL();

  }


}
