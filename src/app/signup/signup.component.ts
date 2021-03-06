import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";

import {Router} from "@angular/router";

//auth service
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isBusy: boolean;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  public signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required),
   
  });

  //pass the form data to the service signup function  
  signup(formData: FormData){
    this.isBusy = true;

    this.authService.signUp(formData["email"], formData["password"])
    .then( () => {
      this.isBusy = false;
      this.router.navigate(["/plans"]);
    })
    .catch((err) => {
      this.isBusy = false;
      console.log("An error ocurred: ", err);
    });
  }

  ngOnInit() {

  }

}
