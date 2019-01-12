import { Component, OnInit } from '@angular/core';
//import { CarouselHandlerService } from "../carousel-handler.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

import {ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansComponent implements OnInit {

  constructor(
    public authService: AuthService,
    //private carouselHandler: CarouselHandlerService,
    private router: Router
  ) { }

  menuSelected: string;
  imageSources: string[];
  authSubscription: Subscription;

  /*
  menuHandler($event: Event) {
    this.carouselHandler.menuHandler($event);
  }
 */
  ngOnInit() {
   // this.carouselHandler.sourcesChange.subscribe(x => this.imageSources = x);
   // this.carouselHandler.labelsChange.subscribe(x => this.menuSelected = x);
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
