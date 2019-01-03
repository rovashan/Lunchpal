import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {

  constructor(private firestore: AngularFirestore ) { }


  //add users to the user database
  public addUser(userData: Object){
    return this.firestore.collection("users").add(userData);
  }

  //check if user has active plan
  public getUser(uid: string) {
    return this.firestore.collection("users").doc(uid).snapshotChanges();
  }

}
