import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {Location} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
//shopping cart service
import {ShoppingcartService} from "../../shoppingcart.service";
//notifications service
import {OnesignalService} from "../../onesignal/onesignal.service";
//firestore service
import {AfirestoreService} from "../../afirestore.service";
//auth service
import {AuthService} from "../../auth/auth.service";


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
    private location: Location,
    private afirestore: AfirestoreService,
    private authService: AuthService
  ) { 
    
    //actually redirect to the same component
    //and see the changes in localStorage
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
    }

    this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
       // trick the Router into believing it's last link wasn't previously loaded
       this.router.navigated = false;
       // if you need to scroll back to top, here is the right place
       window.scrollTo(0, 0);
    }

}); 

}
  
    public orderForm = new FormGroup({
    deliveryDate: new FormControl('', Validators.required),
    deliveryTime: new FormControl('', Validators.required)
    
  });

  orderedItems: any;
  orderTotal : number;
  mainmeal : boolean;
  totalCredits: number = 65;
  enoughCredits: boolean;
  laterSelected: boolean;
  emptyBasket = this.shoppingcart.emptyBasket;
  
  userStatus = this.authService.userStatus;


  goback($event: Event){
    $event.preventDefault();
    this.location.back();
  }

  meridian:string;

  slipTime(){
  
  if(this.shoppingcart.deliveryTime !== "soon"){
    let timeSplit = this.shoppingcart.deliveryTime.split(':'),
    hours,
    minutes,
    meridian;

    
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'pm';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'am';
    if (hours == 0) {
      hours = 12;
    }
    
  } else {
    meridian = 'pm';
  }
  this.meridian = meridian;

  }else{
    this.meridian = "";
  }

  }

  placeOrder(formData: FormData){
    this.slipTime();
    console.log("order sent", formData);
    //check if items
    if(localStorage.getItem("cart")){
      //console.log("products details", this.orderedItems);
      
      let order = {
        userId: this.authService.userDocId,
        userName: this.authService.userName,
        items: this.orderedItems,
        delTime: this.shoppingcart.deliveryTime + " " + this.meridian,
        total: this.totalCredits,
        status: "not delivered" 
      }

      console.log("order", order);
      
      //send the meal to the collection order
      this.afirestore.createOrder(order).then(docRef => {
        //get the id of the document
        console.log("orderDocId", docRef.id);
      }).catch( err => {
        console.log("Error: ", err);
      })


      
      //remove cart after submit
      localStorage.removeItem("cart");  

      //send the cart to the collection orders
      this.shoppingcart.removeUpdatedItems();

      //set empty basket
      this.shoppingcart.setEmptyBasket(true);
    }else{
      //meal
      //console.log("meal details", this.orderedItems);
      let order = {
        userId: this.authService.userDocId,
        userName: this.authService.userName,
        quantity: "1",
        items: this.orderedItems,
        delTime: this.shoppingcart.deliveryTime + " " + this.meridian,
        total: this.totalCredits,
        status: "not delivered" 
      }

      console.log("order", order);
      
      //send the meal to the collection order
      this.afirestore.createOrder(order).then(docRef => {
        //get the id of the document
        console.log("orderDocId", docRef.id);
      }).catch( err => {
        console.log("Error: ", err);
      })


      //remove meal after submit 
      localStorage.removeItem("meal");
    }
    this.router.navigate(["/canteen/thankyou"]);
    //send a push notification
    //this.notifications.customNotification("Order Placed", "Your order has been placed, thanks for using Lunchpal");  
    
  }

  removeMeal(meal: string){
    this.shoppingcart.removeMeal(meal);
    console.log(meal);
  }

  removeItemFromCart(item:string){
    console.log('remove item');
    this.shoppingcart.removeItem(item);
  }


  getTime($event: Event){
    //get the value of the time input
    let timeValue = $event.target["value"];
    this.shoppingcart.deliveryTime = timeValue;
    
  }

  //hide the input
  soonSelected(){
    this.laterSelected = false;
    this.orderForm.controls.deliveryTime.setValue("00:00");
    this.shoppingcart.deliveryTime = "soon";
  }

  //show the time input
  showTime(){
    this.laterSelected = true;
    this.orderForm.controls.deliveryTime.setValue(this.shoppingcart.deliveryTime);
    
  }

  ngOnInit() {
    //subscribe to the basket changes
    this.shoppingcart.emptyBasketChange.subscribe(x => this.emptyBasket = x);
    //load the shoppingcart
    this.shoppingcart.loadCart();

   
    //nothing is defined
    if(localStorage.getItem("cart") == null && localStorage.getItem("meal") == null){
      this.shoppingcart.emptyBasketChange.next(false);
      
    }


    //meal is defined
    if(localStorage.getItem("cart") != null ){
      
      let parsed = JSON.parse(localStorage.getItem("cart"));
      if(parsed.length === 0) {
        localStorage.removeItem("cart");
      }else{
        
      this.orderedItems = this.shoppingcart.items;
      this.orderTotal = this.shoppingcart.total;

      if(this.orderTotal <= this.totalCredits ){
        this.enoughCredits = true;
      }else {
        this.enoughCredits = false;
      }  
      this.mainmeal = false;
      this.shoppingcart.emptyBasketChange.next(true);
      
      /*
      console.log("items", this.orderedItems);
      console.log("total", this.orderTotal);
      */
      }

    }else{
      this.shoppingcart.emptyBasketChange.next(false);
    }
    //products are added
    if(localStorage.getItem("meal") != null){
      this.mainmeal = true;
      this.shoppingcart.emptyBasketChange.next(true);
      this.orderedItems = this.shoppingcart.meal["name"];
      this.orderTotal = this.shoppingcart.meal["price"];
      
      if(this.orderTotal <= this.totalCredits ){
        this.enoughCredits = true;
      }else {
        this.enoughCredits = false;
      }  
      /*
      console.log("items", this.orderedItems);
      console.log("total", this.orderTotal);
      */
    }
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    

  }

}
