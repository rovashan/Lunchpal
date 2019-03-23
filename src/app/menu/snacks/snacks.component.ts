import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingcartService } from "../../shoppingcart.service";
import { AuthService } from "../../auth/auth.service";
import { AfirestoreService } from "../../afirestore.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss']
})
export class SnacksComponent implements OnInit, OnDestroy {

  constructor(private shoppingcart: ShoppingcartService, private authService: AuthService, private aFirestore: AfirestoreService) { }
  userStatus = this.authService.userStatus;
  menuSubscription: Subscription;
  snacks: any[] = [];
  isBusy: boolean;

  addProduct(quantity: number, obj: Object) {
    this.shoppingcart.addProduct(quantity, obj);
  }
  changeUI($event: Event, item: any, name: string) {
    this.shoppingcart.orderedItems($event, item, name);
  }

  ngOnInit() {
    //this.shoppingcart.updateItems();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);

    this.isBusy = true;
    this.menuSubscription = this.aFirestore.getSnacks().subscribe(snacks => {
      this.isBusy = false;
      let menuSnacks = [];
      snacks.map(snack => {
        let thisSnack: any = snack;
        thisSnack.qty = '1';

        menuSnacks.push(thisSnack);
        this.snacks = menuSnacks;
      })
      //console.log(this.snacks);
    }, error =>  {
      this.isBusy = false;
      console.log('Snacks error: ', error);
    });
  }
  /*
  ngAfterViewInit(){
    this.shoppingcart.updateItems();
  }
  */
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
