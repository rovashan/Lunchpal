import { Injectable } from '@angular/core';
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
  public totalCredits: number;
  public cart: any;
  public meal: any;
  public emptyBasket: boolean;

  public emptyBasketChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.emptyBasket);
  //listen for the changes so we can update the basket icon
  //on the nav
 
  setEmptyBasket(bool: boolean): void{
    this.emptyBasket = bool;
    this.emptyBasketChange.next(bool);
    
  }



  //change ui 
  orderedItems($event: Event){
   
    let parent = $event.srcElement.parentElement;
    
    let input = parent.querySelector("input");
    //add the input to localStorage
    localStorage.setItem(input.name, input.value);
  
  }


  //update items
  updateItems(){
    let inputs = document.getElementsByTagName("input");
   
    for(let i = 0; i < inputs.length; i++){
    if(localStorage.getItem(inputs[i]["name"])){
      let x = document.getElementsByName(inputs[i]["name"]);
      x[0].setAttribute("value", localStorage.getItem(inputs[i]["name"]))
      x[0].setAttribute("placeholder", localStorage.getItem(inputs[i]["name"]))
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

  checkForEmpty(){
    if((localStorage.getItem("cart") != null && localStorage.getItem("cart").includes("product")) || localStorage.getItem("meal")){
      this.setEmptyBasket(true);
      console.log("has products or meal", this.emptyBasket);
      
    }else if(localStorage.getItem("cart") == null){
      this.setEmptyBasket(true);
    }else{
      this.setEmptyBasket(false);
      console.log("has products or meal", this.emptyBasket);
      
    }    

    //redirect to the same component
    //in order to see the changes inside localStorage
    this.router.navigateByUrl('canteen/order', {skipLocationChange: true}).then(()=>
      this.router.navigate(["canteen/order"]));


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
        console.log("meal is null");
        
    }
  }else{
    console.log("cart is null");
    this.meal = JSON.parse(localStorage.getItem("meal"));
    
  }

  }

  //remove meal
  removeMeal(name:string){
    console.log("meal removed");
    localStorage.removeItem("meal");
    this.checkForEmpty();
  }


  //remove item from cart
  removeItem(name: string){
    console.log("item deleted");
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item["product"] == name) {
				cart.splice(i, 1);
				break;
			}
    }
    this.removeCurrentItem(name);
    localStorage.setItem("cart", JSON.stringify(cart));
    //this.loadCart();
    this.checkForEmpty();
  }

  
  removeCurrentItem(name: string){
    //process the name of the item
    //in order to just delete that item from localStorage
    //and to keep the other items
    //to display the values on the ui
    let noSpacesName = name.replace(/ /g, "");
    let lowercase = noSpacesName.toLocaleLowerCase()

    let arr = []; 
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) == lowercase && localStorage.key(i) !== 'onesignal-notification-prompt') {
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
    //set meal variable on localStorage
    localStorage.setItem("meal", JSON.stringify(obj)); 
    
  }


  //add product to the cart
  addProduct(quantity: any, obj: Object){
    
    

    //check if quantity is undefined
    if(quantity == undefined || quantity == null ){
      console.log("quantity is not defined");
    }else{
      
    console.log("item added");     
  
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
      let cart: any = [];
      //push the item
      cart.push(JSON.stringify(item));
      //set the local cart var to the localStorage
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
          cart.push(JSON.stringify(item));
          localStorage.setItem("cart", JSON.stringify(cart));
        }else{
          let item: Item = JSON.parse(cart[index]);
          item.quantity = quantity;
          
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
    }


    }
    
}

}
