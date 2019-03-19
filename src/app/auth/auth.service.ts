import { Injectable } from '@angular/core';
//firebase auth module
import { AngularFireAuth } from '@angular/fire/auth';
//Afirestore service
import { AfirestoreService } from "../afirestore.service";
import { map } from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import { Router } from "@angular/router";
import { User } from '../models/user';
import { UserStatus } from '../models/user-status';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afirestore: AfirestoreService,
    private router: Router  ) { }

  public loginError: string;
  public signupError: string;
  public userId: string;
  public userName: string;
  public _userFullName: string;
  public userDocId: string;
  public userSubscriptionId: string;
  public userStatus: string;
  public userSubscription: object;
  public userFullName: any;

  public userSubscriptionChanges: BehaviorSubject<object> = new BehaviorSubject<object>(this.userSubscription);
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  public userFullNameChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.userFullName);

  setUserFullName(userFullName: any): void {
    this.userFullName = userFullName;
    this.userFullNameChanges.next(userFullName);
  }


  setUserSubscription(userSubscriptionObj: object): void {
    this.userSubscription = userSubscriptionObj;
    this.userSubscriptionChanges.next(userSubscriptionObj);
    
  }
  setUserStatus(userStatus: string): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  

  //user auth state
 public user: any = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        this.userId = authState.uid;
        this.userName = authState.email;
        return authState
      }
    })
  );

  //create account function
  signUp(email: string, password: string) : Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {

        let userObj: User = {
          id: user.user.uid,
          createdDate: new Date(),
          email: user.user.email,
          status: UserStatus.New,
          subscription: ""
        }
        this.afirestore.addUser(userObj)
        .then(doc => {
          this.userDocId = doc.id;
        });

        this.signupError = "";
        //this.router.navigate(["/plans"]);
      })
      .catch((err) => {
        //console.log("An error ocurred: ", err);
        this.signupError = err.message;
      })
  }

  //logout function
  logOut() {
    this.afAuth.auth.signOut()
    .then(()=>{
      this.setUserSubscription(null);
      //console.log("user signed Out successfully");
      //send the user to the main page
     this.router.navigate(["/"]);
     
     //remove cart
     if(localStorage.getItem("cart")){
       localStorage.removeItem("cart");
     }
    //remove meal
     if(localStorage.getItem("meal")){
      localStorage.removeItem("meal");
     }
    }).catch((err) => {
      console.log(err);
    })
  }

  //this function gets the current user persisted by firestore
  //at first it will run with an error, but once the user is logged in
  //it will re-fill the needed variables so the interface can react properly
  userChanges(){
    this.afAuth.auth.onAuthStateChanged(currentUser => {
     //console.log("current User", currentUser);
     this.userId = currentUser["uid"];
     this.userName = currentUser["email"];
     //console.log("current user email", this.userName)
     this.afirestore.checkUser().subscribe(users =>{
        users.map(user => {
          if(user.payload.doc.data()["email"] === this.userName){
            
             //console.log("user ", user.payload.doc.data());
              //get us the document ID of the current user
              this.userDocId = user.payload.doc.id;
              this.userSubscriptionId = user.payload.doc.data()["subscription"];
              this.userStatus = user.payload.doc.data()["status"];
              //this._userFullName = user.payload.doc.data()["firstName"] + " " + user.payload.doc.data()["lastName"];
              this._userFullName = user.payload.doc.data()["firstName"];

              this.setUserFullName(this._userFullName);
            
             //console.log("subscription status", user.payload.doc.data()["status"]);
              
              if(this.userStatus === "Expired"){
                this.setUserStatus("Expired");
                console.log(this.userStatus);
              }else{
                this.setUserStatus("Active");
              }

              if(this.userSubscriptionId !== ""){
                this.afirestore.getUserSubscription(this.userSubscriptionId)
                .subscribe(data =>{
                  //this.userSubscription = data;
                  this.setUserSubscription(data);
                  //console.log("User subscription", this.userSubscription)
                })
             } else{
                console.log("user subscription is empty")
              }

           }
          
        })
     })
    })
  }


  //login function
  login(email: string, password: string) : Promise<any> {
    this.loginError = "";
   
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      //the auth user ID will not match the id of the user document
      //we will need to find the user manually and check for its status
      this.afirestore.checkUser().subscribe(users=>{
        users.map(user => {
        
          
          if(user.payload.doc.data()["email"] === this.userName){

            //get us the document ID of the current user
            this.userDocId = user.payload.doc.id;
            this.userSubscriptionId = user.payload.doc.data()["subscription"];
            this.userStatus = user.payload.doc.data()["status"];
            this._userFullName = user.payload.doc.data()["firstName"] + " " + user.payload.doc.data()["lastName"];
            this.setUserFullName(this._userFullName);

       
            //if the user status is expired
            //makes the changes for the nav to hide the cart and credits
            if(this.userStatus === "Expired"){
              this.setUserStatus("Expired");
              //console.log(this.userStatus);
            }else{
              this.setUserStatus("Active");
            }
            //console.log(this.userSubscriptionId, this.userStatus);
            

            if(this.userSubscriptionId !== ""){
              this.afirestore.getUserSubscription(this.userSubscriptionId)
              .subscribe(data =>{
                //this.userSubscription = data;
                this.setUserSubscription(data);
                //console.log("User subscription", this.userSubscription)
              })
            } else{
              console.log("user subscription is empty");
            }
            
            
            let x = user.payload.doc.data()["status"];
          
            switch (x){
              case UserStatus.New: {
                this.router.navigate(["/plans"]);
                break;
              }
              case UserStatus.Active: {
                this.router.navigate(["/canteen"]);
                break;
              }
              case UserStatus.Expired: {
             
                this.router.navigate(["/renew"]);
                break;
              }
              default: {
                break;
              }
            }
          
          }   
        })
      })
      
    }).catch(err => this.loginError = err)
    }
    
    }