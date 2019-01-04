import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit {

  constructor(private router: Router) { }


  order(){
    console.log("order selected!");
    this.router.navigate(["/plan/order"]);
  }


  ngOnInit() {
  }

}
