import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingcartService } from "../../shoppingcart.service";
import { AuthService } from "../../auth/auth.service";
import { AfirestoreService } from "../../afirestore.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lightmeals',
  templateUrl: './lightmeals.component.html',
  styleUrls: ['./lightmeals.component.scss']
})
export class LightmealsComponent implements OnInit, OnDestroy {

  isBusy: boolean;

  constructor(private shoppingcart: ShoppingcartService, private authService: AuthService, private aFirestore: AfirestoreService) { }

  userStatus = this.authService.userStatus;
  menuSubscription: Subscription;
  lightmeals: any[] = [];

  addProduct(quantity: number, ligthmeal: Object) {
    this.shoppingcart.addProduct(quantity, ligthmeal);
  }
  changeUI($event: Event, item: any, name: string) {
    this.shoppingcart.orderedItems($event, item, name);
  }


  ngOnInit() {
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);

    this.isBusy = true;
    this.menuSubscription = this.aFirestore.getLightMeals().subscribe(lightmeals => {
      this.isBusy = false;
      let menuLightMeals = [];
      lightmeals.map(lightmeal => {
        let thisLightMeal: any = lightmeal;
        thisLightMeal.qty = '1';

        menuLightMeals.push(thisLightMeal)
        this.lightmeals = menuLightMeals;
      })
      //console.log(this.lightmeals);
    }, error =>  {
      this.isBusy = false;
      console.log('Light meals error: ', error);
    });
  }

  /*
  ngAfterContentChecked(){
  
    let matSelectElems = document.getElementsByTagName("mat-select");
    if(matSelectElems.length !== 0){
      this.shoppingcart.updateItems();
    }
  }
  */
  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();

  }
}
