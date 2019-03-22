import { Component, OnInit, OnDestroy } from '@angular/core';

//authservice
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }


  user;
  username = this.authService.userFullName;
  
  userStatus = this.authService.userStatus;

  ngOnInit() {
    if(this.authService.user == null ){
      this.user = null    
    }else{
      this.authService.user.subscribe(user => {
        this.user = true;
       
    })
    }  
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    
    this.authService.userFullNameChanges.subscribe(x => this.username = x);
  }
 
}
