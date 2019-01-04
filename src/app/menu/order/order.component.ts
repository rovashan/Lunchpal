import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }
  public orderForm = new FormGroup({
    deliveryDate: new FormControl('', Validators.required),
    
  });

  placeOrder(formData: FormData){

    console.log("order sent", formData);
    //maybe show a notification here too
  }

  ngOnInit() {
  }

}
