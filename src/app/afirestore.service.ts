import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from "rxjs";

/*
import { User } from './models/user';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
*/
@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {
  constructor(
    private firestore: AngularFirestore,
  ) { }


  items: any;
  meals: any[];
  public userMealsChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.meals);

  setUserWeeklyMeals(meals: any): void {
    this.meals = meals;
    this.userMealsChanges.next(meals);

  }

 
  //get current user subscription
  public getUserSubscription(userSubscription: any) {

    return this.firestore.collection("subscriptions").doc(userSubscription).valueChanges();
  }

  //get the plans
  public getPlans() {
    //we need the document ID for the plan reference
    return this.firestore.collection("plans", ref => ref.orderBy('price')).snapshotChanges();
  }

  public getSelectedPlan(planId: string) {
    return this.firestore.collection("plans").doc(planId).valueChanges();
  }

  //add users to the user database
  public addUser(user: object) {
    return this.firestore.collection("users").add(user);

  }

  //get the plan details
  public displayPlanData(currentUserID: any) {
    return this.getUser(currentUserID);
  }

  //update user status
  public updateUserStatus(docId: string) {
    this.firestore.collection("users").doc(docId).update({ status: "ACTIVE" });
  }


  public updateUserSubscription(docId: string, path: any) {
    this.firestore.collection("users").doc(docId).update({ subscription: path })
  }

  public getUser(uid: string) {
    //valueChanges excludes metadata so it's lighter than snapshotChanges
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

  //create the user subscription
  public addSubscription(userName: string, userId: string, plan: Object) {
    let data = {
      userName: userName,
      userId: userId,
      planName: plan["planName"],
      planInitDate: plan["initDate"],
      planExpDate: plan["expDate"],
      planId: plan["planId"],
      planCredits: plan["planCredits"],
      address: plan["deliveryAddress"]
    }

    //return the function so we can use the observable
    //to update the user subscription
    return this.firestore.collection("subscriptions").add(data);
  }


  public addPaymentReference(userDocId: string, firstName: string, lastName: string, phone: string,
    address: string, building: string, plan: object, subscriptionStartDate: string, subscriptionEndDate: string) {
    let data = {
      createdDate: new Date(),
      userId: userDocId,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      userAddress: address,
      userBuilding: building ? building : "Not set",  //if building defined else "Not Set"
      subscribedPlan: plan,
      subscriptionStartDate: subscriptionStartDate,
      subscriptionEndDate: subscriptionEndDate,
      paymentStatus: null
    }
    return this.firestore.collection("payments").add(data)
  }
  
  //event payment reference
  public addEventPaymentReference(userDocId: string, firstName: string, lastName: string, phone: string,
    address: string, building: string, order: object, orderTotal: number){
      let data = {
        createdDate: new Date(),
        userId: userDocId,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        userAddress: address,
        userBuilding: building ? building : "Not set",  //if building defined else "Not Set"
        order,
        orderTotal,
        paymentStatus: null
      }
      return this.firestore.collection("events").add(data);
  }

  //get the users last subscription
  public renewSubscription(userName: string, userId: string, subscriptionId: string, plan: Object) {

    //ref needed to delete past instance of the 
    //user subscription
    let subscriptionRef = this.firestore.collection("subscriptions").doc(subscriptionId);


    //------------- may need user data for address other details**

    //create another subscription
    let data = {
      userName: userName,
      userId: userId,
      planName: plan["planName"],
      planInitDate: plan["initDate"],
      planExpDate: plan["expDate"],
      planId: plan["planId"],
      planCredits: plan["planCredits"]
    }

    console.log(data);

    return this.firestore.collection("subscriptions").add(data).then((data) => {
      console.log(data);

      this.updateUserStatus(userId);
      this.updateUserSubscription(userId, data.id);
      //delete the past subscription doc
      subscriptionRef.delete();
    });

  }

  //get the users in order to check the status
  public checkUser() {
    return this.firestore.collection("users", ref => ref.orderBy("email", "asc")).snapshotChanges();
  }


  public createOrder(orders: object) {
    return this.firestore.collection("orders").add(orders);
  }

  //get the menu for landing pages
  public getVeggieMenu() {
    return this.firestore.doc('landing/veggieMenu').valueChanges();
  }
  public getClassicMenu() {
    return this.firestore.doc('landing/classicMenu').valueChanges();
  }
  public getLifestyleMenu() {
    return this.firestore.doc('landing/lifestyleMenu').valueChanges();
  }

  //get weeklymenus for menu
  public getWeeklyMains(currentDate: any, planSelected: string, weekday: string) {

    this.meals = [];
    //this.setUserWeeklyMeals([]);

    this.firestore.doc(`weeklymenu/${currentDate}/plans/${planSelected}/weekdays/${weekday}`).valueChanges()
      .subscribe(data => {

        let weeklyMeals = [];

        Object.keys(data).forEach((key) => {
          // console.log(key, data[key])
          this.firestore.doc(data[key]).valueChanges().subscribe(x => {
            //push to the meals array
            //console.log(x)
            let meal: any = x;
            meal.qty = '1';
            weeklyMeals.push(meal);

          })

        });
        //console.log("weeklyMeals", weeklyMeals);
        this.setUserWeeklyMeals(weeklyMeals)
        //console.log(this.meals);
      });
  }

  // public getWeeklyMains(currentDate: any, planSelected: string, weekday: string) : Observable<any[]> 
  // {
  //   let weeklyMeals = [];
  //   weeklyMeals.push('hi');

  //   this.firestore.doc(`weeklymenu/${currentDate}/plans/${planSelected}/weekdays/${weekday}`).valueChanges()
  //     .subscribe(data => {
  //       //this.meals = [];


  //       //this.setUserWeeklyMeals([]);

  //       Object.keys(data).forEach((key) => {
  //         // console.log(key, data[key])
  //         this.firestore.doc(data[key]).valueChanges().subscribe(x => {
  //           //push to the meals array
  //           //console.log(x)
  //           let meal: any = x;
  //           meal.qty = '1';
  //           weeklyMeals.push(meal);

  //           return of(weeklyMeals);
  //         })


  //       });


  //       //console.log("weeklyMeals", weeklyMeals);
  //       //this.setUserWeeklyMeals(weeklyMeals)
  //       //console.log(this.meals);
  //     });

  // }

  // //get products for the menu
  // public getMains(currentDate: any, planSelected: string, weekday: string) {
  //   this.firestore.doc(`weeklymenu/${currentDate}/plans/${planSelected}/weekdays/${weekday}`).valueChanges()
  //   .subscribe(data => {
  //     let weeklyMains = [];

  //     Object.keys(data).forEach((key) => {
  //       // console.log(key, data[key])
  //       this.firestore.doc(data[key]).valueChanges().subscribe(x => {
  //         //push to the meals array
  //         //console.log(x)
  //         let meal: any = x;
  //         meal.qty = '1';
  //         weeklyMains.push(meal);

  //       })

  //     });

  //   })
  // }

  public getDrinks() {
    return this.firestore.collection("menu/drinks/products").valueChanges();
  }

  public getSnacks() {
    return this.firestore.collection("menu/snacks/products").valueChanges();
  }

  public getLightMeals() {
    return this.firestore.collection("menu/lightmeals/products").valueChanges();
  }


  public sendMessage(name: string, email: string, message: string) {

    let data = {
      createdDate: new Date(),
      name: name,
      email: email,
      message: message
    }
    return this.firestore.collection("messages").add(data)
  }

  public getSettings(userId: string) {
    return this.firestore.collection("settings").doc(userId).valueChanges();
  }

  public updateDailyLimitSetting(userId: string, value: any) {
    return this.firestore.collection("settings").doc(userId).update({ dailyLimit: value })
  }

  public updateRemindersSetting(userId: string, value: any) {
    return this.firestore.collection("settings").doc(userId).update({ reminders: value })
  }

  public addBalanceToUSer(docId: string, balance: any) {
    this.firestore.collection("users").doc(docId).update({ balance: balance });
  }

  public getCaterers(){
    return this.firestore.collection("caterers").valueChanges();
  }

  public getCaterer(docId: string){ 
    return this.firestore.collection("caterers").doc(docId).valueChanges();
  }

}
