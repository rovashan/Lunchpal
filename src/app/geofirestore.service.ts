import { Injectable } from '@angular/core';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { BehaviorSubject } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class GeofirestoreService {

  caterers: any;
  geoFirestore: any;
  firestore: any;
  geoCollection: GeoCollectionReference;
  query :  GeoQuery;
  constructor() {
    this.firestore= firebase.firestore();
    this.geoFirestore = new GeoFirestore(this.firestore);
    this.geoCollection = this.geoFirestore.collection("caterers");
   }
/*
  public setLocation(lat: any, lng: any, data: any){
    return this.geoCollection.doc().set({
      coordinates: new firebase.firestore.GeoPoint(lat, lng),
      address: data["address"],
      name: data["name"]
  }).then(result => {
      console.log(result);
      return 0;
  }).catch(error => {
      console.log(error);
      return 1;
  });
  }
*/
  public getNearbyCaterers(lat: any, lng: any){
   return this.query = this.geoCollection.near({ center: new firebase.firestore.GeoPoint(lat, lng), radius: 100 });
  }
  
}
