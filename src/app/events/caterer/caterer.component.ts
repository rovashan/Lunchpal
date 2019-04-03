import { Component, OnInit, OnDestroy, Inject, AfterContentChecked } from '@angular/core';
import { AfirestoreService } from "../../afirestore.service";

import { Router, ActivatedRoute,  NavigationEnd } from "@angular/router";
import { Subscription } from 'rxjs';

import {MatDialog} from '@angular/material';
//import the dialog component
import {OrderdialogComponent } from "../../orderdialog/orderdialog.component";
import { ShoppingcartService } from "../../shoppingcart.service";


@Component({
  selector: 'app-caterer',
  templateUrl: './caterer.component.html',
  styleUrls: ['./caterer.component.scss'],
  
  entryComponents: []
})
export class CatererComponent implements OnInit, OnDestroy, AfterContentChecked {

  constructor( 
    private afirestore: AfirestoreService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private shoppingCart: ShoppingcartService,
    private router: Router, ) {
      
    //actually redirect to the same component
    //and see the changes in localStorage
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
       // window.scrollTo(0, 0);
      }

    });
     }
  
  
  caterer;
  catererSubscription: Subscription;
  orderedItems: any;
  orderTotal: number;
  emptyBasket = this.shoppingCart.emptyBasket;
  
  openDialog(mealObj: Object): void {
    const dialogRef = this.dialog.open(OrderdialogComponent, {
      width: '300px',
      data: {name: mealObj["name"], description: mealObj["description"], price: mealObj["price"] }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.mealQuantity = result;
      //add to localStorage
      this.shoppingCart.addProduct(result, {name: mealObj["name"], price: mealObj["price"]});
      
      //console.log(result);
    });
  }

  getCatererInfo(docId: string){
    this.catererSubscription = this.afirestore.getCaterer(docId).subscribe( info => {
      this.caterer = info["d"];
    });
    
  } 
  
  checkout(){
    // TODO: redirects to the payment form
    this.router.navigate(["/payment/id"])
  }

  removeItemFromCart(item: string) {
    //console.log('remove item');
    this.shoppingCart.removeItem(item, `/events/caterer/${this.route.snapshot.paramMap.get("id")}`);
    
  }

  ngOnInit() {
    this.getCatererInfo(this.route.snapshot.paramMap.get("id"));
  
    this.shoppingCart.emptyBasketChange.subscribe(x => this.emptyBasket = x);
  
  }

  ngAfterContentChecked(){
     //load the shoppingcart
     this.shoppingCart.loadCart();

     if (localStorage.getItem("cart") == null && localStorage.getItem("meal") == null) {
       this.shoppingCart.emptyBasketChange.next(false);
 
     }


     if (localStorage.getItem("cart") != null) {
 
       let parsed = JSON.parse(localStorage.getItem("cart"));
       if (parsed.length === 0) {
         localStorage.removeItem("cart");
       } else {
    
         this.orderedItems = this.shoppingCart.items;
         this.orderTotal = this.shoppingCart.total;
         //this.totalCredits
 
       //  this.mainmeal = false;
         this.shoppingCart.emptyBasketChange.next(true);
 
         
        // console.log("items", this.orderedItems);
        // console.log("total", this.orderTotal);
         
       }
 
     } else {
       this.shoppingCart.emptyBasketChange.next(false);
     }
  
  }

  ngOnDestroy(){
   // this.catererSubscription.unsubscribe();
  }
}