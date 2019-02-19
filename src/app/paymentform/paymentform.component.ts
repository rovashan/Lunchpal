/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute } from "@angular/router";
//firestore services
import { AfirestoreService } from "../afirestore.service";
import { ViewEncapsulation } from "@angular/core";
import { PaymentService } from './shared/payment.service';
import { PReq } from './shared/p-req';
//momentjs
import * as moment from "moment";
import { MatStepper } from '@angular/material/stepper';

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

  ) { }

  @ViewChild("placesRef") placesRef;
  @ViewChild("stepper") stepper: MatStepper;

  public handleAddressChange(address: string) {
    // Do some stuff
    console.log('handleAddressChange');
    console.log('handleAddressChange: ', address);
    this.selectedAddress = address["name"] + ", " + address["formatted_address"];
  }

  public inputAddressChange(event) {
    console.log(event.srcElement.value);
    this.selectedAddress = event.srcElement.value;
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
  mondayState: boolean = false;
  isBusy: boolean;
  selectedPlan = null;
  minDate = new Date();

  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-26.139873, 27.944540),
    new google.maps.LatLng(-26.029446, 28.087677));


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day == 1;
  }

  //personal form controls
  public personal = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
  });

  //delivery form controls
  public deliveryInfo = new FormGroup({
    address: new FormControl('', Validators.required),
  })

  //payment request form
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

  deliveryChanged() {
    if (this.deliveryInfo.valid) {
      this.deliveryState = true;
      console.log('deliveryState: ', this.deliveryState);
    } else {
      this.deliveryState = false;
      console.log('deliveryState: ', this.deliveryState);
    }
  }

  deliveryCompleted() {
    //console.log('User address: ', this.selectedAddress);

    this.isBusy = true;
    let userSelectedDate = this.startdate;
    let endDate = moment(userSelectedDate).utc().add(12, "months").format("YYYY-MM-DD");

    console.log('userSelectedDate: ', userSelectedDate);

    let subsStartDate = moment(userSelectedDate).utc().add(1, "week").format("YYYY-MM-DD");
    let subsEndDate = moment(subsStartDate).utc().add(12, "months").format("YYYY-MM-DD");;

    let preq: PReq = {
      VERSION: '21',
      PAYGATE_ID: '10011072130',
      REFERENCE: this.selectedfirstname,
      AMOUNT: this.selectedPlan["price"] * 100,
      CURRENCY: 'ZAR',
      RETURN_URL: "https://lunch-api-8ff4b.firebaseapp.com/api/pay",

      TRANSACTION_DATE: '2019-02-10 18:30',
      EMAIL: this.authService.userName,
      SUBS_START_DATE: subsStartDate,
      SUBS_END_DATE: subsEndDate,
      SUBS_FREQUENCY: '112',

      PROCESS_NOW: 'YES',
      PROCESS_NOW_AMOUNT: this.selectedPlan["price"] * 100,
      CHECKSUM: ''
    }

    //create the payment document    
    let plan = {
      planName: this.selectedPlan["name"],
      planPrice: this.selectedPlan["price"],
      creditsPerDay: this.selectedPlan["creditsPerDay"],
      planDocId: this.route.snapshot.paramMap.get("plan")
    }

    this.aFirestore.addPaymentReference(
      this.authService.userDocId,
      this.selectedfirstname,
      this.selectedlastname,
      this.selectedphone,
      this.selectedAddress,
      plan,
      this.startdate,
      endDate
    ).then((docRef) => {
      // only if payment doc successfully created
      // set request reference to new payment doc id
      preq.REFERENCE = docRef.id;

      //calc request
      this.paymentService.calc(preq).subscribe(
        data => {
          console.log("Calc Request is successful ", data);
          // only if request calc successful
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
          });

          // Set stepper completed and move
          this.stepper.selected.completed = true;
          this.isBusy = false;
          this.stepper.next();

        },
        error => {
          this.isBusy = false;
          console.log("Error", error);
        });

    }).catch(err => {
      this.isBusy = false;
      console.log('Error creating payment document: ', err);
    });

  }

  //update the summary overview
  //to display the user data
  onDeliveryFormChanges(data) {
    this.selectedfirstname = data.firstname;
    this.selectedlastname = data.lastname
    this.selectedphone = data.phone;

    console.log('data.address: ', data.address);
    if (data.address) {
      this.selectedAddress = data.address;
    }
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

  //------ this is the end of the function that sends the data to firestore

  pay() {
    let x: any = document.getElementById("payForm");

    //submit the PayGate Form
    x.submit();
  }

  checkDate($event: any) {
    //let day = moment($event).utc().format("dddd");
    this.startdate = moment($event).format("YYYY-MM-DD");
  }

  ngOnInit() {
    console.log('User address: ', this.selectedAddress);

    this.personal.valueChanges.subscribe(data => {
      this.onDeliveryFormChanges(data);
    });

    this.authSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });

    this.getSelectedPlan();

    this.personal.setValue({
      firstname: 'Ro',
      lastname: 'S',
      phone: '0',
      startdate: '2019-02-25'
    });

  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    console.log('destroyed');
  }
}
