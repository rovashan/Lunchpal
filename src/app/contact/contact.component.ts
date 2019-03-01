import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AfirestoreService } from '../afirestore.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageSent: boolean = false;

  constructor(private aFirestore: AfirestoreService,) { }
  
  public contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',  Validators.required),
    message: new FormControl('',  Validators.required),
   
  });

  //just saving to firestore
  sendMessage(formdata: FormData){
    //console.log(formdata);

    this.aFirestore.sendMessage(formdata['name'], formdata['email'], formdata['message']).then( () => {
      this.messageSent = true;
    });

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
