import { Component, OnInit } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";


@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService) { }


  order(ligthmeal: Object){
    this.shoppingcart.order(ligthmeal);
  }  


  ngOnInit() {
  }

}
