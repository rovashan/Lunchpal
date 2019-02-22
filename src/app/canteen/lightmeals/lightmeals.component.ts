import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService,  private authService: AuthService) { }

  userStatus = this.authService.userStatus;
  addProduct(quantity: number, ligthmeal: Object){
    this.shoppingcart.addProduct(quantity, ligthmeal);
  }  
  changeUI($event: Event, item: any, name: string){
  
    this.shoppingcart.orderedItems($event, item, name);
  }
  

  ngOnInit() {
    this.shoppingcart.updateItems();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    
  }

}
