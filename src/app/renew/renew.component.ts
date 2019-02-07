import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AfirestoreService} from "../afirestore.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RenewComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private afirestore: AfirestoreService,
    private router: Router
  ) { }

  authSubscription: Subscription;
  plans:any[] = [];  
  selectedPlan: object;

  public getplans(){
    this.afirestore.getPlans().subscribe(plans => {
      let _plans = [];
    
      plans.map(plan => {
      _plans.push({
        id: plan.payload.doc.id,
        data: plan.payload.doc.data()
      })
     })
     this.plans = _plans;
    console.log(this.plans)
    })
  }

  
  selectPlan(planId) {
    //use the plan id to fetch the collection
    this.afirestore.getSelectedPlan(planId).subscribe(plan => {
      let renewedPlan = {
        initDate: "Initial date",
        expDate: "expiration date",
        planId: planId,
        planName: plan["name"],  
        planCredits: plan["creditsPerDay"]
      }
      
      console.log(renewedPlan);
      this.afirestore.renewSubscription(this.authService.userName, this.authService.userDocId, this.authService.userSubscriptionId, renewedPlan);
    
    });

  }

  ngOnInit() {
    this.getplans();
  }
 
  ngOnDestroy() {
  }

}
