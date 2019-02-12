import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {HttpClient} from "@angular/common/http";

import { ActivatedRoute } from "@angular/router";
//firestore services
import { AfirestoreService } from "../afirestore.service";
import { ViewEncapsulation } from "@angular/core";
import { PaymentService } from './shared/payment.service';
import { PReq } from './shared/p-req';


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
    private paymentService: PaymentService,
    private httpClient: HttpClient
    

  ) { }

  @ViewChild("placesRef") placesRef;

  public handleAddressChange(address: string) {
    // Do some stuff
   this.selectedAddress = address["name"] + ", " + address["formatted_address"];
 
  }

  selectedfirstname: string;
  selectedlastname: string;
  selectedphone: string;
  startdate: string;
  selectedAddress: string;
  personalState: boolean = false;
  deliveryState: boolean = false;
  authSubscription: Subscription;
  userEmail: string;

  selectedPlan = null;

  //delivery form controls
  public personal = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
    
  });

  public deliveryInfo = new FormGroup({
    address: new FormControl('', Validators.required),
  })
  //delivery form controls
  public payment = new FormGroup({
    VERSION: new FormControl('', Validators.required),
    PAYGATE_ID: new FormControl('', Validators.required),
    REFERENCE: new FormControl('', Validators.required),
    AMOUNT: new FormControl('', Validators.required),
    CURRENCY: new FormControl('', Validators.required),
    RETURN_URL: new FormControl('', Validators.required),

    TRANSACTION_DATE: new FormControl('', Validators.required),
    EMAIL: new FormControl('', Validators.required),
    SUBS_START_DATE: new FormControl('', Validators.required),
    SUBS_END_DATE: new FormControl('', Validators.required),
    SUBS_FREQUENCY: new FormControl('', Validators.required),

    PROCESS_NOW: new FormControl('', Validators.required),
    PROCESS_NOW_AMOUNT: new FormControl('', Validators.required),
    CHECKSUM: new FormControl('', Validators.required),
  });

  //get the plan selected
  getSelectedPlan() {
    let planId = this.route.snapshot.paramMap.get("plan");
    this.aFirestore.getSelectedPlan(planId).subscribe(plan => {
      this.selectedPlan = plan;
    })
  }

  personalCompleted() {
    if (this.personal.valid) {
      this.personalState = true;
      console.log(this.personalState);
    } else {
      this.personalState = false;
      console.log(this.personalState);
    }
  }

  
  deliveryCompleted() {
    if(this.deliveryInfo.valid){
      this.deliveryState = true;
      console.log(this.deliveryState);
    }else{
      this.deliveryState = false;
      console.log(this.deliveryState);
    }
    // show loader
 
    //get the next Monday
    let d = new Date();
    let x;
    let currentDate;
    //if today is Monday
    if(d.getDay() === 1 ){
      x = d.setDate(d.getDate());
      currentDate = new Date(x);
      console.log("today is Monday: ", currentDate);
    }else{
      //else get the next Monday in the calendar
      x = d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
      currentDate = new Date(x);
      console.log("next Monday is : ", currentDate);
    }
    
    
    let preq: PReq = {
      VERSION: '21',
      PAYGATE_ID: '10011072130',
      REFERENCE:  this.selectedfirstname,
      AMOUNT: this.selectedPlan["price"] * 100,
      CURRENCY: 'ZAR',
      RETURN_URL: "https://us-central1-lunch-api-8ff4b.cloudfunctions.net/webApi",

      TRANSACTION_DATE: '2019-02-10 18:30',
      EMAIL: this.authService.userName,
      SUBS_START_DATE: currentDate,
      SUBS_END_DATE: '2020-02-18',
      SUBS_FREQUENCY: '112',

      PROCESS_NOW: 'YES',
      PROCESS_NOW_AMOUNT: this.selectedPlan["price"] * 100,
      CHECKSUM: ''
    }



    //calc and wait for observable
    this.paymentService.calc(preq).subscribe(
      data => {
        console.log("POST Request is successful ", data);

        // setup payment form fields
        this.payment.setValue({
          VERSION: data.VERSION,
          PAYGATE_ID: data.PAYGATE_ID,
          REFERENCE: data.REFERENCE,
          AMOUNT: data.AMOUNT,
          CURRENCY: data.CURRENCY,
          RETURN_URL: data.RETURN_URL,
    
          TRANSACTION_DATE: data.TRANSACTION_DATE,
          EMAIL: data.EMAIL,
          SUBS_START_DATE: data.SUBS_START_DATE,
          SUBS_END_DATE: data.SUBS_END_DATE,
          SUBS_FREQUENCY: data.SUBS_FREQUENCY,
    
          PROCESS_NOW: data.PROCESS_NOW,
          PROCESS_NOW_AMOUNT: data.PROCESS_NOW_AMOUNT,
          CHECKSUM: data.CHECKSUM
        })
    
        //this.deliveryState = true;
      },
      error => {
        console.log("Error", error);
      });

  }

  //update the summary overview
  //to display the user data
  onDeliveryFormChanges(data) {
    this.selectedfirstname = data.firstname;
    this.selectedlastname = data.lastname
    this.startdate = data.startdate;
  }

/*
  createUserSubscription() {

    console.log("Order confirmed!");
    
    let plan = {
      initDate: "Initial date",
      expDate: "expiration date",
      planId: this.route.snapshot.paramMap.get("plan"),
      planName: this.selectedPlan["name"],
      planCredits: this.selectedPlan["creditsPerDay"],
      deliveryAddress: this.selectedAddress

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
        this.aFirestore.updateUserSubscription(this.authService.userDocId, data.id);
        
        //create the payment doc with the subscription docID
        this.aFirestore.addPaymentReference(
          this.authService.userName,
          this.authService.userDocId,
          this.selectedfirstname,
          data.id
        )

    }).catch(err => {
      console.log(err);
    })
  
  }
*/

createPaymentDoc(){
  this.aFirestore.addPaymentReference(
    this.authService.userName,
    this.authService.userDocId,
    this.route.snapshot.paramMap.get("plan"),
    this.selectedfirstname,
    
  )
}

  //------ this is the end of the function that sends the data to firestore

pay() {
  let x: any = document.getElementById("payForm");
  this.createPaymentDoc();

  //this.createUserSubscription();
  
  //submit the PayGate Form
  //x.submit(); 
 
}

 
  ngOnInit() {

    
    this.personal.valueChanges.subscribe(data => {
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
