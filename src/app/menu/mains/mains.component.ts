import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";


@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.scss']
})
export class MainsComponent implements OnInit {

  constructor(private router: Router) { }

  order(){
    console.log("order selected!");
    this.router.navigate(["/plan/order"]);
  }


  ngOnInit() {
  }

}
