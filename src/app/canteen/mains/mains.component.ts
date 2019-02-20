import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService,   private authService: AuthService) { }
  userStatus = this.authService.userStatus;

  order(meal: Object){
    this.shoppingcart.order(meal);
    this.shoppingcart.removeItemsAfterMealSelected();
  }  

  ngOnInit() {
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
  }

}
