import { Component, OnInit } from '@angular/core';
//authservice
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService) { }


  user = false;
  username = this.authService.userFullName;
  userStatus = this.authService.userStatus;

  ngOnInit() {
    // if (this.authService.user == null) {
    //   this.user = null
    // } else {
    //   this.authService.user.subscribe(user => {
    //     this.user = true;
    //   })
    // }

    this.authService.user.subscribe(user => {
      if (user) {
        this.user = true;
        console.log('this.user = true');
        
        this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    
        this.authService.userFullNameChanges.subscribe(x => this.username = x);
      } else {
        this.user = false 
        console.log('this.user = false');
      }
    });
  }

}
