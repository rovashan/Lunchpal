import { Injectable, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
//item
import {Item} from "./models/item";

import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  constructor(private router: Router) { }

  public items: Item[];
  public total: number;
  public fakeTotal:number = 0;
  public totalCredits: number;
  public cart: any;
  public meal: any;
  public emptyBasket: boolean;
  public deliveryTime: any;
  //public shake: boolean = false;
  public totalChange: any;

  public emptyBasketChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.emptyBasket);
  public totalChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.totalChange);

  setEmptyBasket(bool: boolean): void{
    this.emptyBasket = bool;
    this.emptyBasketChange.next(bool);
    
  }

  setTotalChange(total: any): void {
    this.totalChange = total;
    this.totalChanges.next(total);
  }


/*
  shakeBasket(){
    console.log("basket is shaking");
    let basket = document.getElementById("basket");
   
      basket.classList.add("shake");
 
  
    setTimeout(()=>{
      basket.classList.remove("shake");
    }, 500)
    
  }
*/
  //change ui 
  /*
  orderedItems($event: Event){
  
    let parent = $event.srcElement.parentElement;
    
    let input = parent.querySelector("input");
    //add the input to localStorage
    
    localStorage.setItem(input.name, input.value);
    this.setEmptyBasket(true);
  
  }
*/
orderedItems($event: Event, item: any, name: string){
  //console.log(item, name);
  localStorage.setItem(name, item);
  this.setEmptyBasket(true);

}

  //update items
  updateItems(){
   // console.log("updateItems called");
    //wait for the component to be available
    let matSelectElems = document.getElementsByTagName("mat-select");
   
   for(let i = 0; i < matSelectElems.length; i++){
      //get the number of items on localStorage
      let name = matSelectElems[i].getAttribute("ng-reflect-name");
      if(localStorage.getItem(name)){
        let children = matSelectElems[i].firstChild.firstChild;
        children.textContent = localStorage.getItem(name);
       // console.log(name)
       // console.log(children);
      }
      
    }       

  }


  removeUpdatedItems(){
    let arr = []; // Array to hold the keys
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) !== 'onesignal-notification-prompt') {
            arr.push(localStorage.key(i));
        }
    }
    // Iterate over arr and remove the items by key
    for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }
   
  
  }

  removeItemsAfterMealSelected(){
    let arr = []; 
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) !== 'meal' && localStorage.key(i) !== 'onesignal-notification-prompt' ) {
            arr.push(localStorage.key(i));
        }
    }
    for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
    }
    
  }

  checkForEmpty(route: string){
    if((localStorage.getItem("cart") != null && localStorage.getItem("cart").includes("product"))){
      this.setEmptyBasket(true);
      //console.log("has products or meal", this.emptyBasket);
      
    }else if(localStorage.getItem("cart") == null){
      this.setEmptyBasket(true);
    }else{
      this.setEmptyBasket(false);
     //console.log("has products or meal", this.emptyBasket);
      
    }    

    //redirect to the same component
    //in order to see the changes inside localStorage
    //'menu/order'
    this.router.navigateByUrl(route, {skipLocationChange: true}).then(()=>
      this.router.navigate([route]));


}

  calcTotal(){
    this.total = 0;
    this.items = [];
    if(localStorage.getItem("cart") != null){
      let cart = JSON.parse(localStorage.getItem("cart"));
      for(let i = 0; i < cart.length; i++){
        //parse each item in the cart
        let item = JSON.parse(cart[i]);
        //push the items to the array
        this.items.push({
          product: item["product"],
          quantity: item["quantity"],
          price: item["price"]
        });
        //get the total
        this.total += item["price"] * item["quantity"];
        this.fakeTotal = this.total;
        this.setTotalChange(this.fakeTotal);
        console.log(this.items)
      
    }
  }
}


  loadCart(){
    this.total = 0;
    this.items = [];
    if(localStorage.getItem("cart") != null){
      let cart = JSON.parse(localStorage.getItem("cart"));
      for(let i = 0; i < cart.length; i++){
        //parse each item in the cart
        let item = JSON.parse(cart[i]);
        //push the items to the array
        this.items.push({
          product: item["product"],
          quantity: item["quantity"],
          price: item["price"]
        });
        //get the total
        this.total += item["price"] * item["quantity"];
        //console.log(this.items)
        
       // console.log("meal is null");
        
    }
  }else{
    //console.log("cart is null");
    this.meal = JSON.parse(localStorage.getItem("meal"));
    
  }

  }

  //remove meal
  removeMeal(name:string, route){
    console.log("meal removed");
    localStorage.removeItem("meal");
    this.checkForEmpty(route);
  }


  //remove item from cart
  removeItem(name: string, route){
   // console.log("item deleted");
   

    let cart: any = JSON.parse(localStorage.getItem("cart"));
   // console.log(cart);
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item["product"] == name) {
				cart.splice(i, 1);
				break;
			}
    }
    //pass the name of the item to the remove function
    this.removeCurrentItem(name);
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = 0;
    let items = [];
    if(localStorage.getItem("cart") != null){
      let cart = JSON.parse(localStorage.getItem("cart"));
      for(let i = 0; i < cart.length; i++){
        //parse each item in the cart
        let item = JSON.parse(cart[i]);
        //push the items to the array
        items.push({
          product: item["product"],
          quantity: item["quantity"],
          price: item["price"]
        });
        //get the total
        total += (item["price"] * item["quantity"]);
       // console.log(total);
        this.fakeTotal = total;
        this.setTotalChange(this.fakeTotal);
      
     }
  
  }    

    this.checkForEmpty(route);
  }


  removeItemFromArray(name: string){
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
     let index: number = -1;
     for (var i = 0; i < cart.length; i++) {
       let item: Item = JSON.parse(cart[i]);
       if (item["product"] == name) {
         cart.splice(i, 1);
         break;
       }
     }
     //pass the name of the item to the remove function
     this.removeCurrentItem(name);
     localStorage.setItem("cart", JSON.stringify(cart));
     let total = 0;
     let items = [];
     if(localStorage.getItem("cart") != null){
       let cart = JSON.parse(localStorage.getItem("cart"));
       for(let i = 0; i < cart.length; i++){
         //parse each item in the cart
         let item = JSON.parse(cart[i]);
         //push the items to the array
         items.push({
           product: item["product"],
           quantity: item["quantity"],
           price: item["price"]
         });
         //get the total
         total += (item["price"] * item["quantity"]);
        // console.log(total);
         this.fakeTotal = total;
         this.setTotalChange(this.fakeTotal);
       
      }
   
   }    
 
   //  this.checkForEmpty(route);
  } 
  
  
  removeCurrentItem(name: string){
    //process the name of the item
    //in order to just delete that item from localStorage
    //and to keep the other items
    //to display the values on the ui
    
    let arr = []; 
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) == name && localStorage.key(i) !== 'onesignal-notification-prompt') {
            arr.push(localStorage.key(i));
        }
    }
    for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
      }
   

  }

  //order meal
  order(obj: Object){
  
    if(localStorage.getItem("cart")){
      
      localStorage.removeItem("cart");
      console.log("the user selected a meal, removed cart from storage");
    }
    //this.shakeBasket();
    //set meal variable on localStorage
    localStorage.setItem("meal", JSON.stringify(obj)); 
    this.setEmptyBasket(true);
    this.setTotalChange(obj["price"]);
    
  }


  //add product to the cart
  addProduct(quantity: any, obj: Object){
   let total;

    //check if quantity is undefined
    if(quantity == undefined || quantity == null ){
      console.log("quantity is not defined");
    }else{
   
    //remove meal is the variable exists
    if(localStorage.getItem("meal")){
      localStorage.removeItem("meal");
       console.log("products added, removed meal from local storage")
    }
      
    //build each item
    let item: Item = {
      product: obj["name"],
      quantity: quantity,
      price: obj["price"]
    } 


    //check if the cart exists
    if(localStorage.getItem("cart") == null){
      //the cart doesnt exist
      let cart: any = [];
      //push the item
    
      console.log("item added", item);     
      cart.push(JSON.stringify(item));
      //set the local cart var to the localStorage
     
      //use the first value added to be the item price * quantity
      //when the cart is created,
      //this is the only time we will need this value
      this.fakeTotal = (item["price"] * item["quantity"]);
      this.setTotalChange(this.fakeTotal);
      localStorage.setItem("cart", JSON.stringify(cart));
     
   
    }else{
      //the cart is already set
   
      let cart: any = JSON.parse(localStorage.getItem("cart"));
      let index: number = -1;

        for(let i = 0; i < cart.length; i++){
          let item: Item = JSON.parse(cart[i]);
          if(item.product == obj["name"]){
        
            index = i;
            break;
          }
        }
        if(index == -1){
         //item doesnt exist, add it
          cart.push(JSON.stringify(item));
          console.log("new item added", item);
              
          this.fakeTotal += (item["price"] * item["quantity"]);
        
          this.setTotalChange(this.fakeTotal);
          localStorage.setItem("cart", JSON.stringify(cart));
       
        }else{
          //item already exists, add to the quantity
        
          let item: Item = JSON.parse(cart[index]);
          item.quantity = quantity;
          console.log("item already exits", item);  
          cart[index] = JSON.stringify(item);
         
          localStorage.setItem("cart", JSON.stringify(cart));
        
          //loop through the localStorage
          //reset the total and calculate it using the items in the local Storage
          total = 0;
          let items = [];
          if(localStorage.getItem("cart") != null){
            let cart = JSON.parse(localStorage.getItem("cart"));
            for(let i = 0; i < cart.length; i++){
              //parse each item in the cart
              let item = JSON.parse(cart[i]);
              //push the items to the array
              items.push({
                product: item["product"],
                quantity: item["quantity"],
                price: item["price"]
              });
              //get the total
              total += (item["price"] * item["quantity"]);
              console.log(total);
              this.fakeTotal = total;
              this.setTotalChange(this.fakeTotal);
            
           }
        
        }
    }


    }
  
}

}
}
