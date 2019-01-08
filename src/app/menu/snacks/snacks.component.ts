import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss']
})
export class SnacksComponent implements OnInit {

  snackone;
  snacktwo;
  snackthree;

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
