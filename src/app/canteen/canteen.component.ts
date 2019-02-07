import { Component, OnInit, OnDestroy } from '@angular/core';

//authservice
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  constructor(private authService: AuthService) { }


  username;
  userStatus = this.authService.userStatus;

  ngOnInit() {
    if(this.authService.user == null ){
      this.username = null    
    }else{
      this.authService.user.subscribe(user => {
        this.username = user.email;
    })
    }  
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
  }
 
}
