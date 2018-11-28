import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  
  public contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',  Validators.required),
    message: new FormControl('',  Validators.required),
   
  });

  //basic form implementation
  //just consoling the values to test
  sendMessage(formdata: FormData){
    console.log(formdata);
    //set the values to an empty string, to clear the form
    this.contactForm.setValue({
      name: '',
      email: '',
      message: ''
    });
  }

  ngOnInit() {
  }

}
