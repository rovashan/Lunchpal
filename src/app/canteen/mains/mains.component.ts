import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from "../../shoppingcart.service";
import { AuthService } from "../../auth/auth.service";
import { AfirestoreService } from "../../afirestore.service";
import { ApiService } from 'src/app/api.service';

import * as moment from "moment";

@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {

  constructor(
    private shoppingcart: ShoppingcartService,
    private authService: AuthService,
    private aFirestore: AfirestoreService,
    private apiService: ApiService) { }

  weeklyMeals = this.aFirestore.meals;
  userStatus = this.authService.userStatus;

  order(meal: Object) {
    this.shoppingcart.order(meal);
    this.shoppingcart.removeItemsAfterMealSelected();
  }

  ngOnInit() {


    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    //get the user weekly meals
    this.aFirestore.userMealsChanges.subscribe(x => {
      this.weeklyMeals = x;
      console.log("weekly meals", this.weeklyMeals);
    });

    //use the subscription to get the plan
    this.authService.userSubscriptionChanges.subscribe(subscription => {
      //for a split second subscription will be undefined
      if (subscription !== undefined) {
        let weekday;

        //get the date
        this.apiService.getServerDate().subscribe(date => {
          //console.log('server date: ', date);

          let weekStart = moment(date).startOf("isoWeek").format("YYYY-MM-DD"); //the start of the current week
          console.log(weekStart);
          let day = moment().weekday(); //gets the number of the day, monday is 1 

          switch (day) {
            case 0: {
              weekday = "sunday";
              console.log(weekday);
              break;
            }
            case 1: {
              weekday = "monday";
              console.log(weekday);
              break;
            }
            case 2: {
              weekday = "tuesday";
              console.log(weekday);
              break;
            }
            case 3: {
              weekday = "wednesday";
              console.log(weekday);
              break;
            }
            case 4: {
              weekday = "thursday";
              console.log(weekday);
              break;
            }
            case 5: {
              weekday = "friday";
              console.log(weekday);
              break;
            }
            case 6: {
              weekday = "saturday";
              console.log(weekday);
              break;
            }

          }

          let plan = subscription["plan"]["planName"];
          let lowercasePlan = plan.toLowerCase();
          this.aFirestore.getWeeklyMenusCanteen(weekStart, lowercasePlan, weekday);

        });
      }
    });
  }

}
