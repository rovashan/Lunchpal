import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {

  constructor(private firestore: AngularFirestore ) { }

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
    this.firestore.collection("users").add(user);
   
  }

  
  public getUser(uid: string) {
    //valueChanges excludes metadata so it's lighter than snapshotChanges
    return this.firestore.collection("users").doc(uid).valueChanges();
  }


  public addSubscription(userName: string, userId: string, plan: Object){
    let data = {
      userName: userName,
      userId: userId,
      planName: plan["planName"],
      planInitDate: plan["initDate"],
      planExpDate: plan["expDate"],
      planId: plan["planId"]
    }
  
    this.firestore.collection("subscriptions").add(data); 
    //console.log(userName, userId);
  }

  public checkUser(){
    return this.firestore.collection("users", ref => ref.orderBy("email", "asc")).valueChanges();
  }


}
