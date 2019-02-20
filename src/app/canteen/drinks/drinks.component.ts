import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService,  private authService: AuthService) { }
  userStatus = this.authService.userStatus;

  
  addProduct(quantity: number, obj: Object){
    this.shoppingcart.addProduct(quantity, obj);
  }
  changeUI($event: Event){
    //this.shoppingcart.orderedItems($event);
   
  }
  
  ngOnInit() {
    this.shoppingcart.updateItems();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
  }


}
