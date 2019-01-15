import { Component, OnInit } from '@angular/core';
import { CarouselHandlerService } from "../carousel-handler.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

import {ViewEncapsulation} from "@angular/core";
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansComponent implements OnInit {


  selectedIndex= this.carouselHandler.selectedIndex;


  constructor(
    public authService: AuthService,
    private carouselHandler: CarouselHandlerService,
    private router: Router
  ) { }

      
  //------------- scroll variables
  startX;
  curDown = false;
  scrollLeft;
  //------------- scroll variables

  menuSelected: string;
  imageSources: string[];
  authSubscription: Subscription;

  

    goNext(){
      this.carouselHandler.goNext()
    }

    goPrev(){
      this.carouselHandler.goPrev();
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
     this.carouselHandler.tabChanged(tabChangeEvent);
     
    }



  //------------- scroll functions 
  
  scrollDrag($event: MouseEvent){
    $event.preventDefault();
    let el = $event.srcElement.closest(".scroller");
    
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
    let el = $event.srcElement.closest(".scroller");
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



  /*
  menuHandler($event: Event) {
    this.carouselHandler.menuHandler($event);
  }
 */
  ngOnInit() {
   // this.carouselHandler.sourcesChange.subscribe(x => this.imageSources = x);
   // this.carouselHandler.labelsChange.subscribe(x => this.menuSelected = x);
   this.carouselHandler.tabChanges.subscribe(x => this.selectedIndex = x);
   
   
    
  }


  selectPlan() {
    this.authSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(["/payment"]);
      } else {
        this.router.navigate(["/signup"]);
      }
    });
  }

  
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
    console.log('destroyed');
  }
  
}
