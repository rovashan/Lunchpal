import { Component, OnInit, OnDestroy } from '@angular/core';

//authservice
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  constructor(private authservice: AuthService) { }


  username;


  ngOnInit() {
    if(this.authservice.user == null ){
      this.username = null    
    }else{
      this.authservice.user.subscribe(user => {
        this.username = user.email;
    })
    }  
  }
}
