import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

import {ActivatedRoute} from "@angular/router";
//firestore services
import {AfirestoreService} from "../afirestore.service";
import {ViewEncapsulation} from "@angular/core";


@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentformComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private aFirestore: AfirestoreService,
    private route: ActivatedRoute,

    ){ }

    @ViewChild("placesRef") placesRef;
    
    public handleAddressChange(address: string) {
    // Do some stuff
    console.log(address);
}


  selectedfirstname:string;
  selectedlastname:string;
  selectedphone: string;
  startdate:string;

  personalState: boolean = false;
  creditState: boolean = false;
  authSubscription: Subscription;
  userEmail: string;

  selectedPlan = null;


  //delivery form controls
  public personal = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('',  Validators.required),
    phone: new FormControl('',  Validators.required),
    startdate: new FormControl('',  Validators.required),
    address: new FormControl('',  Validators.required),
  });

  //credit card form controls
  public creditCard = new FormGroup({
    cardnumber: new FormControl('', Validators.required),
    expdate: new FormControl('',  Validators.required),
    seccode: new FormControl('',  Validators.required),
    
  });


  //get the plan selected
  getSelectedPlan(){
    let planId = this.route.snapshot.paramMap.get("plan")
    this.aFirestore.getSelectedPlan(planId).subscribe(plan => {
      this.selectedPlan = plan;
    })
  }

  personalCompleted(){
    if(this.personal.valid){
      this.personalState = true;
      console.log(this.personalState);
    }else{
      this.personalState = false;
      console.log(this.personalState);
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
    this.selectedlastname = data.lastname
    this.selectedphone = data.phone;
    this.startdate = data.startdate;
  }

  //confirm order
  confirmOrder(){
   
    console.log("Order confirmed!");
    let plan = {
      initDate: "Initial date",
      expDate: "expiration date",
      planId: this.route.snapshot.paramMap.get("plan"),
      planName: this.selectedPlan["name"],  
      planCredits: this.selectedPlan["creditsPerDay"]
      
    }
    console.log(this.selectedPlan);
   
    console.log(this.authService.userName);
    console.log(this.authService.userDocId);

    //Create the user subscription
    this.aFirestore.addSubscription(this.authService.userName, this.authService.userDocId, plan)
    .then(data => {
      //this is the documents ID reference
      console.log(data.id);
      this.aFirestore.updateUserStatus(this.authService.userDocId);
      this.aFirestore.updateUserSubscription(this.authService.userDocId , data.id);
      
    }).catch()
   
  }
 
  ngOnInit() {
    this.personal.valueChanges.subscribe( data => {
      this.onDeliveryFormChanges(data);
    });

    this.authSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
    
    this.getSelectedPlan();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
    console.log('destroyed');
  }
}
