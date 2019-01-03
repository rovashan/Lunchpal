import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AfirestoreService {

  constructor(private firestore: AngularFirestore ) { }

  //add users to the user database
  public addUser(userData: User){
    return this.firestore.collection("users").doc(userData.id).set(userData);
  }

  public getUser(uid: string) {
    //valueChanges excludes metadata so it's lighter than snapshotChanges
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

}
