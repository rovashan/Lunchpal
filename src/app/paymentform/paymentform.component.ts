import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.scss']
})
export class PaymentformComponent implements OnInit {

  constructor() { }
  selectedfirstname:string;
  selectedlastname:string;
  selectedemail:string;
  selectedaddress:string;
  selectedcity:string;
  selecteddate:string;


  deliveryState:boolean = false;
  creditState: boolean = false;


  //delivery form controls
  public delivery = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('',  Validators.required),
    email: new FormControl('',  Validators.required),
    street: new FormControl('',  Validators.required),
    apartment: new FormControl('',  Validators.required),
    city: new FormControl('',  Validators.required),
    phone: new FormControl('',  Validators.required),
    fdeldate: new FormControl('',  Validators.required),
   
   
  });

  //credit card form controls
  public creditCard = new FormGroup({
    cardnumber: new FormControl('', Validators.required),
    expdate: new FormControl('',  Validators.required),
    seccode: new FormControl('',  Validators.required),
    
  });

  deliveryCompleted(){
    if(this.delivery.valid){
      this.deliveryState = true;
      console.log(this.deliveryState);
    }else{
      
      this.deliveryState = false;
      console.log(this.deliveryState);
    }
  }

  creditCompleted(){
    if(this.creditCard.valid){
      this.creditState = true;
      console.log(this.creditState);
    }else{
      
      this.creditState = false;
      console.log(this.creditState);
    }
  }


  //update the summary overview
  //to display the user data
  onDeliveryFormChanges(data){
    this.selectedfirstname = data.firstname;
    this.selectedlastname = data.lastname;
    this.selectedemail = data.email;
    this.selectedaddress = data.street;
    this.selectedcity = data.city;
    this.selecteddate = data.fdeldate;
  }



  //confirm order
  confirmOrder(){
    console.log("Order confirmed!");
  }
 
  ngOnInit() {
    this.delivery.valueChanges.subscribe( data => {
      this.onDeliveryFormChanges(data);
    });

  }
}
