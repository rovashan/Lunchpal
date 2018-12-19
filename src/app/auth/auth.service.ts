import { Injectable } from '@angular/core';

//firebase auth module
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
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
        return authState.email
      }
    })
  ); 

  //create account function
  signUp(email:string, password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user)=>{

      // Create entry in Firestore users collection
      this.angularFirestore.collection('/users').doc(user.user.uid).set({
        uid: user.user.uid,
        email: user.user.email
      });            

      console.log(user.user.email);
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
  
  //signin function
  signIn(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log(user.user.email);
      this.loginError = "";
      this.router.navigate(["/"]);
    })
    .catch((err)=>{
      console.log("An error ocurred");
      this.loginError = err.message;
    })
  }

  
  hello(){
    console.log("Hello from service");
  }


}
