import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";


@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService) { }

  order(meal: Object){
    this.shoppingcart.order(meal);
    this.shoppingcart.removeItemsAfterMealSelected();
  }  

  ngOnInit() {
  }

}
