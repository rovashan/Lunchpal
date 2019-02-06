import { Component, OnInit } from '@angular/core';

//get the shopping cart service
import {ShoppingcartService} from "../../shoppingcart.service";


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(private shoppingcart: ShoppingcartService) { }


  deliveryTime = this.shoppingcart.deliveryTime || null;
  meridian:string; 


  ngOnInit() {
    if(this.deliveryTime == undefined || this.deliveryTime == null){
      console.log("no time received to split")
    }else{
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
  }

}
