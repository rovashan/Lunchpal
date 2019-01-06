import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {Location} from '@angular/common';
import { Router } from '@angular/router';
//shopping cart service
import {ShoppingcartService} from "../../shoppingcart.service";
//notifications service
import {OnesignalService} from "../../onesignal/onesignal.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private shoppingcart: ShoppingcartService,
    private notifications: OnesignalService,
    private router: Router,
    private location: Location
  ) { }
  
    public orderForm = new FormGroup({
    deliveryDate: new FormControl('', Validators.required),
    
  });

  orderedItems: any;
  orderTotal : number;
  mainmeal : boolean;


  goback($event: Event){
    $event.preventDefault();
    this.location.back();
  }


  placeOrder(formData: FormData){

     
    console.log("order sent", formData);
    
    //check if items
    if(localStorage.getItem("cart")){
      console.log("products details", this.orderedItems);
      //remove cart after submit
      localStorage.removeItem("cart");  
      this.shoppingcart.removeUpdatedItems();
    }else{
      //meal
      console.log("meal details", this.orderedItems);
       //remove meal after submit 
      localStorage.removeItem("meal");
    }
    this.router.navigate(["/"]);
    //send a push notification
    this.notifications.customNotification("Order Placed", "Your order has been placed, thanks for using Lunchpal");  

  }

  ngOnInit() {
    //load the shoppingcart
    this.shoppingcart.loadCart();
    if(localStorage.getItem("cart") == null){
      this.mainmeal = true;

      this.orderedItems = this.shoppingcart.meal["name"];
      this.orderTotal = this.shoppingcart.meal["price"];
      console.log("items", this.orderedItems);
      console.log("total", this.orderTotal);

    }else{
      this.orderedItems = this.shoppingcart.items;
      this.orderTotal = this.shoppingcart.total;
    
      this.mainmeal = false;
      
      console.log("items", this.orderedItems);
      console.log("total", this.orderTotal);
    }
  }

}
