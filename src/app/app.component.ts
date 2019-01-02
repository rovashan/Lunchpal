import { Component, OnInit } from '@angular/core';

//onesignal service
import {OnesignalService} from "./onesignal/onesignal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notifications: OnesignalService){}

  ngOnInit(){
    //init the OneSignal service
    //and check for changes
    this.notifications.init();
    this.notifications.updateChanges();
  }


}
