import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, CollectionReference} from '@angular/fire/firestore';

import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {

  constructor(
    private firestore: AngularFirestore,
    ) { }

  //get current user subscription
  public getUserSubscription(userSubscription: any){
    return this.firestore.collection("subscriptions").doc(userSubscription).valueChanges();
  }  

  //get the plans
  public getPlans(){
    //we need the document ID for the plan reference
    return this.firestore.collection("plans").snapshotChanges();
  }
  
  public getSelectedPlan(planId: string){
    return this.firestore.collection("plans").doc(planId).valueChanges();
  }
  
  //add users to the user database
  public addUser(user: object){
   return this.firestore.collection("users").add(user);
   
  }

  //get the plan details
  public displayPlanData(currentUserID: any){
    return this.getUser(currentUserID);
  }

  //update user status
  public updateUserStatus(docId: string){
    this.firestore.collection("users").doc(docId).update({status: "Active"});
  }


  public updateUserSubscription(docId: string, path: any){
    this.firestore.collection("users").doc(docId).update({subscription: path })
  }

  public getUser(uid: string) {
    //valueChanges excludes metadata so it's lighter than snapshotChanges
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

  //create the user subscription
  public addSubscription(userName: string, userId: string, plan: Object){
    let data = {
      userName: userName,
      userId: userId,
      planName: plan["planName"],
      planInitDate: plan["initDate"],
      planExpDate: plan["expDate"],
      planId: plan["planId"],
      planCredits: plan["planCredits"]
    }
    
    //return the function so we can use the observable
    //to update the user subscription
    return this.firestore.collection("subscriptions").add(data); 
  }

  //get the users in order to check the status
  public checkUser(){
    return this.firestore.collection("users", ref => ref.orderBy("email", "asc")).snapshotChanges();
  }


  


}
