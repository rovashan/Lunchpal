import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

//auth service
import { AuthService } from "../auth/auth.service";
//OneSignal service
import { OnesignalService } from "../onesignal/onesignal.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isBusy: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private notifications: OnesignalService,

  ) { }

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });

  //pass the form data to the service signup function  
  login(formData: FormData) {
    this.isBusy = true;

    this.authService.login(formData["email"], formData["password"])
      .then(() => {
        this.isBusy = false;
      })
      .catch((err) => {
        this.isBusy = false;
        console.log("An error ocurred: ", err);
      });

    //show the notification to remind the user to purchase a plan
    //this.notifications.sendReminder();
  }


  ngOnInit() {


  }

}
