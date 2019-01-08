import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  Drinkone;
  Drinktwo;
  Drinkthree;

  constructor(private shoppingcart: ShoppingcartService) { }

  
  addProduct(quantity: number, obj: Object){
    this.shoppingcart.addProduct(quantity, obj);
  }
  changeUI($event: Event){
    this.shoppingcart.orderedItems($event);
   
  }
  
  ngOnInit() {
    this.shoppingcart.updateItems();
  }


}
