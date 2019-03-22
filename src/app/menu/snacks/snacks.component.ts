import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";
import {AfirestoreService} from "../../afirestore.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss']
})
export class SnacksComponent implements OnInit, AfterContentChecked, OnDestroy  {

  constructor(private shoppingcart: ShoppingcartService, private authService: AuthService,  private aFirestore:AfirestoreService) { }
  userStatus = this.authService.userStatus;
  menuSubscription: Subscription;
  snacks:any[] = [];  

  addProduct(quantity: number, obj: Object){
    this.shoppingcart.addProduct(quantity, obj);
  }
  changeUI($event: Event, item: any, name: string){
    this.shoppingcart.orderedItems($event, item, name);
  }
  
  ngOnInit() {
    //this.shoppingcart.updateItems();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    this.menuSubscription = this.aFirestore.getSnacks().subscribe(snacks => {
      let menuSnacks = [];
      snacks.map(snack => {
        let thisSnack: any = snack;
        thisSnack.qty = '1';

        menuSnacks.push(thisSnack);
        this.snacks = menuSnacks;
      })
      console.log(this.snacks);
    })
  }
  /*
  ngAfterViewInit(){
    this.shoppingcart.updateItems();
  }
  */
 ngAfterContentChecked(){
  
  let matSelectElems = document.getElementsByTagName("mat-select");
  if(matSelectElems.length !== 0){
    this.shoppingcart.updateItems();
  }
}


ngOnDestroy(): void {
  this.menuSubscription.unsubscribe();
  
}
}
