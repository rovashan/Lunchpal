import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  constructor() { }

  //product selection control test
  addProduct(quantity: number, obj: Object){
      
    //assuming the "obj" will come from the database
    //we should be able to access is
    console.log(obj["name"], obj["price"], quantity);
    let total = quantity * obj["price"];
    console.log("total: ", total);
  }

  ngOnInit() {
  }

}
