import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {

  constructor(private firestore: AngularFirestore ) { }

  //add users to the user database
  public addUser(userName: any, userId: any, plan: any){
    
    let data = {
      userName: userName,
      userId: userId,
      planName: plan["planName"],
      planInitDate: plan["initDate"],
      planExpDate: plan["expDate"],
    }
  
   this.firestore.collection("users").add(data);
   
   console.log(userName, userId);
  }

  public getUser(uid: string) {
    //valueChanges excludes metadata so it's lighter than snapshotChanges
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

}
