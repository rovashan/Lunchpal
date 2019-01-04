import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss']
})
export class SnacksComponent implements OnInit {

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
