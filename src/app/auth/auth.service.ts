import { Injectable } from '@angular/core';
//firebase auth module
import { AngularFireAuth } from '@angular/fire/auth';
//Afirestore service
import { AfirestoreService } from "../afirestore.service";
import { map } from "rxjs/operators";
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
    private router: Router
  ) { }

  public loginError: string;
  public signupError: string;

  //user auth state
  user = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState
      }
    })
  );

  //create account function
  signUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {

        //add the user to the users database
        let userData: User = {
          id: user.user.uid,
          createdDate: new Date(),
          email: user.user.email,
          status: UserStatus.New
        }
        this.afirestore.addUser(userData);

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
    .then((user)=>{
      console.log(user.user.uid);
      this.loginError = "";
        this.afirestore.getUser(user.user.uid).subscribe(
          (x: User) => {
            switch (x.status) {
              case UserStatus.New: {
                this.router.navigate(["/plans"]);
                break;
              }
              case UserStatus.Active: {
                this.router.navigate(["/meals"]);
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
          });
      })
      .catch((err) => {
        console.log("An error ocurred");
        this.loginError = err.message;
      })
  }



}
