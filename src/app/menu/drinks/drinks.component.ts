import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import {ShoppingcartService} from "../../shoppingcart.service";
import {AuthService} from "../../auth/auth.service";
import {AfirestoreService} from "../../afirestore.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit, AfterContentChecked {

  constructor(
    private shoppingcart: ShoppingcartService,
    private authService: AuthService,
    private aFirestore: AfirestoreService) { }

  userStatus = this.authService.userStatus;
  menuSubscription: Subscription;
  drinks:any[] = [];  
  
  addProduct(quantity: number, obj: Object){
    this.shoppingcart.addProduct(quantity, obj);
  }
  changeUI($event: Event, item: any, name: string){
   
    this.shoppingcart.orderedItems($event, item, name);
  }
  
  
  ngOnInit() {
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
   this.menuSubscription = this.aFirestore.getDrinks().subscribe(drinks => {
      let menuDrinks = [];
      drinks.map(drink => {
        console.log('drink: ', drink);
        let thisDrink: any = drink;
        thisDrink.qty = '1';

        menuDrinks.push(thisDrink)
        this.drinks = menuDrinks;
      })
      console.log(this.drinks);
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
