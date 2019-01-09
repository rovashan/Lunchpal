import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";


@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService) { }


  addProduct(quantity: number, ligthmeal: Object){
   
    this.shoppingcart.addProduct(quantity, ligthmeal);
  }  
  changeUI($event: Event){
    this.shoppingcart.orderedItems($event);
   
  }
  

  ngOnInit() {
    this.shoppingcart.updateItems();
  }

}
