import { Component, OnInit } from '@angular/core';
import { CarouselHandlerService } from "../carousel-handler.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AfirestoreService} from "../afirestore.service";

import {ViewEncapsulation} from "@angular/core";
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private afirestore: AfirestoreService,
    private carouselHandler: CarouselHandlerService,
    private router: Router
  ) { }

    plans:any[] = [];  

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



      
  //------------- scroll variables
  startX;
  curDown = false;
  scrollLeft;
  //------------- scroll variables

  menuSelected: string;
  imageSources: string[];
  authSubscription: Subscription;

  


  //------------- scroll functions 
  
  scrollDrag($event: MouseEvent){
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");
    
    const x = $event.pageX - el["offsetLeft"];
    const y = x - this.startX;

    if(this.curDown === true){
      el.scrollLeft = this.scrollLeft - y;
      }else{
      return;
    }

    
   
  
 }

  holdDrag($event: MouseEvent){
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");
    this.curDown = true;
    this.startX = $event.pageX - el["offsetLeft"];
    this.scrollLeft = el.scrollLeft;
    
  }

  releaseDrag($event: MouseEvent){
    this.curDown = false;
 
  
  }

  leaveDrag($event:MouseEvent){
    this.curDown = false;
  
  }


  //------------- scroll functions 

  goNext($event: Event){
    this.carouselHandler.goNext($event);
   
  }

  goPrev($event: Event){
    this.carouselHandler.goPrev($event);
  }


  selectPlan(plan) {
    this.authSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate([`/payment/${plan}`]);
      } else {
        this.router.navigate(["/signup"]);
      }
    });
  }

  
  ngOnInit() {
    this.getplans();
    
     
   }
 
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
    console.log('destroyed');
  }
  
}
