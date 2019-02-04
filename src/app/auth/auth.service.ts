import { Injectable } from '@angular/core';
//firebase auth module
import { AngularFireAuth } from '@angular/fire/auth';
//Afirestore service
import { AfirestoreService } from "../afirestore.service";
import { map } from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
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
  public userDocId: string;
  public userSubscriptionId: string;
  public userSubscription: object;

  public userSubscriptionChanges: BehaviorSubject<object> = new BehaviorSubject<object>(this.userSubscription);

  setUserSubscription(userSubscriptionObj: object): void {
    this.userSubscription = userSubscriptionObj;
    this.userSubscriptionChanges.next(userSubscriptionObj);
    
  }

  //user auth state
  user = this.afAuth.authState.pipe(
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
  signUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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
        this.router.navigate(["/plans"]);
      })
      .catch((err) => {
        console.log("An error ocurred: ", err);
        this.signupError = err.message;
      })
  }

  //logout function
  logOut() {
    this.afAuth.auth.signOut()
    .then(()=>{
      this.setUserSubscription(null);
      console.log("user signed Out successfully");
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

  //login function
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.loginError = "";
      //the auth user ID will not match the id of the user document
      //we will need to find the user manually and check for its status
      this.afirestore.checkUser().subscribe(users=>{
        users.map(user => {
          
          
          if(user.payload.doc.data()["email"] === this.userName){
            //get us the document ID of the current user
            this.userDocId = user.payload.doc.id;
            this.userSubscriptionId = user.payload.doc.data()["subscription"];
            console.log(this.userSubscriptionId);

            if(this.userSubscriptionId !== ""){
              this.afirestore.getUserSubscription(this.userSubscriptionId)
              .subscribe(data =>{
                //this.userSubscription = data;
                this.setUserSubscription(data);
                console.log("User subscription", this.userSubscription)
              })
            }else{
              console.log("user subscription is empty")
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
      
    })
    }
    
    }