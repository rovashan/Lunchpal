import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

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
    private paymentService: PaymentService

  ) { }

  @ViewChild("placesRef") placesRef;

  public handleAddressChange(address: string) {
    // Do some stuff
    console.log(address);
  }

  selectedfirstname: string;
  selectedlastname: string;
  selectedphone: string;
  startdate: string;

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
    address: new FormControl('', Validators.required),
  });

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
    let planId = this.route.snapshot.paramMap.get("plan")
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

    // show loader

    // get form
    // set form values

    this.payment.setValue({
      VERSION: '21',
      PAYGATE_ID: '10011072130',
      REFERENCE: 'Customer1',
      AMOUNT: '3299',
      CURRENCY: 'ZAR',
      RETURN_URL: 'https://localhost',

      TRANSACTION_DATE: '2019-02-09 15:08',
      EMAIL: 'rovashan@gmail.com',
      SUBS_START_DATE: '2019-02-11',
      SUBS_END_DATE: '2020-02-11',
      SUBS_FREQUENCY: '112',

      PROCESS_NOW: 'YES',
      PROCESS_NOW_AMOUNT: '3299',
      CHECKSUM: '3c0ccff652c91f3010f5512eceee8edc'
    })

    this.deliveryState = true;
  }

  //update the summary overview
  //to display the user data
  onDeliveryFormChanges(data) {
    this.selectedfirstname = data.firstname;
    this.selectedlastname = data.lastname
    this.selectedphone = data.phone;
    this.startdate = data.startdate;
  }

  //confirm order
  confirmOrder() {

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
        this.aFirestore.updateUserSubscription(this.authService.userDocId, data.id);

      }).catch()

  }

  confirmPay() {
    // let preq: PReq = new PReq();
    // preq.VERSION = "21";

    // this.paymentService.post(preq);
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

    this.personal.setValue({
      firstname: 'Ro',
      lastname: 'S',
      phone: '1',
      startdate: '2018-02-09',
      address: '1 tana road',
    })
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    console.log('destroyed');
  }
}
