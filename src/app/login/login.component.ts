import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {Router} from "@angular/router";

//auth service
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required),
   
  });

  //pass the form data to the service signup function  
  login(formData: FormData){
    this.authService.signup(formData["email"], formData["password"]);
  }

  ngOnInit() {
   
  }

}
