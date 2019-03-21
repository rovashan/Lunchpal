import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from "rxjs";

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

  /*
    public collectionChanges() {
      //checks the changes in the subscriptions collection
      //only the modified data
      return this.firestore.collection("subscriptions").stateChanges(["modified"]);
    }
  */
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

  //get weeklymenus for canteen
  public getWeeklyMenusCanteen(currentDate: any, planSelected: string, weekday: string) {
    this.firestore.doc(`weeklymenu/${currentDate}/plans/${planSelected}/weekdays/${weekday}`).valueChanges()
      .subscribe(data => {
        let weeklyMeals = [];
        this.setUserWeeklyMeals([]);
        Object.keys(data).forEach((key) => {
          // console.log(key, data[key])
          this.firestore.doc(data[key]).valueChanges().subscribe(x => {
            //push to the meals array
            //console.log(x)
            weeklyMeals.push(x);

          })

        });
        //console.log("weeklyMeals", weeklyMeals);
        this.setUserWeeklyMeals(weeklyMeals)
        //console.log(this.meals);
      });
  }

  //get other products for the canteen
  public getCanteenDrinks() {
    return this.firestore.collection("menu/drinks/products").valueChanges();
  }

  public getCanteenSnacks() {
    return this.firestore.collection("menu/snacks/products").valueChanges();
  }

  public getCanteenLightMeals() {
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
}
