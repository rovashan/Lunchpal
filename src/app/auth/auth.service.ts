import { Injectable } from '@angular/core';
//firebase auth module
import { AngularFireAuth } from '@angular/fire/auth';
//Afirestore service
import {AfirestoreService} from "../afirestore.service";
import { map } from "rxjs/operators";
import {Router} from "@angular/router";




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
    map(authState =>{
      if(!authState){
        return null;
      }else{
        return authState
      }
    })
  ); 

  //create account function
  signUp(email:string, password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      
      //add the user to the users database
      let userData = {
        "email": user.user.email,
        "userID": user.user.uid 
      }
      this.afirestore.addUser(userData);

      this.signupError = "";
      this.router.navigate(["/"]);

    })
    .catch((err)=>{
      console.log("An error ocurred: ", err);
      this. signupError = err.message;
    })
  }    

  //logout function
  logOut(){
    this.afAuth.auth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //send the user to the main page
      this.router.navigate(["/"]);
    }).catch((err) => {
      console.log(err);
    })
  }
  
  //signup function
  signup(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log(user.user.uid);
      this.loginError = "";
      this.router.navigate(["/"]);
    })
    .catch((err)=>{
      console.log("An error ocurred");
      this.loginError = err.message;
    })
  }

  

}
