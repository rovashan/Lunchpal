import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit {

  lightmealone: any;
  lightmealtwo: any;
  lightmealthree: any;

  constructor(private shoppingcart: ShoppingcartService,  private authService: AuthService) { }

  userStatus = this.authService.userStatus;
  addProduct(quantity: number, ligthmeal: Object){
   
    this.shoppingcart.addProduct(quantity, ligthmeal);
  }  
  changeUI($event: Event){
    this.shoppingcart.orderedItems($event);
   
  }
  

  ngOnInit() {
    this.shoppingcart.updateItems();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
  }

}
