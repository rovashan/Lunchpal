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
    // theres a problem with this one
    // if the users logs out inside this same component
    // the authSubscription becomes undefined
    // and the views are not loaded anymore
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
    console.log('destroyed');
  }
  
}
