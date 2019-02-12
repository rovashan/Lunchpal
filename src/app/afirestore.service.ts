import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {


  private itemsCollection: any;
  items:any;

  constructor(
    private firestore: AngularFirestore,
    ) {
      /*
      this.itemsCollection = firestore.collection('subscriptions');
      this.items = this.itemsCollection.stateChanges();
    */
    }

    public collectionChanges(){
      //checks the changes in the subscriptions collection
      //only the modified data
      return this.firestore.collection("subscriptions").stateChanges(["modified"]);
    }
    
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
      planCredits: plan["planCredits"],
      address: plan["deliveryAddress"]
    }
    
    //return the function so we can use the observable
    //to update the user subscription
    return this.firestore.collection("subscriptions").add(data); 
  }

  public addPaymentReference(user: string, userDocId: string, paymentReference: string, subscriptionId: string){
    let data = {
      username: user,
      userReference: userDocId,
      paymentReference: paymentReference, 
      subscriptionId: subscriptionId,
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
  public checkUser(){
    return this.firestore.collection("users", ref => ref.orderBy("email", "asc")).snapshotChanges();
  }


  public createOrder(orders: object){
    return this.firestore.collection("orders").add(orders);
  }  


}
