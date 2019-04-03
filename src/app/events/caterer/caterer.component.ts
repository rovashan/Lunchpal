import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AfirestoreService } from "../../afirestore.service";

import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

import {MatDialog} from '@angular/material';
//import the dialog component
import {OrderdialogComponent } from "../../orderdialog/orderdialog.component";

@Component({
  selector: 'app-caterer',
  templateUrl: './caterer.component.html',
  styleUrls: ['./caterer.component.scss'],
  
  entryComponents: []
})
export class CatererComponent implements OnInit, OnDestroy {

  constructor( private afirestore: AfirestoreService, private route: ActivatedRoute, public dialog: MatDialog ) { }

  animal;
  caterer;
  catererSubscription: Subscription;

  
  openDialog(mealObj: Object): void {
    const dialogRef = this.dialog.open(OrderdialogComponent, {
      width: '250px',
      data: {name: mealObj["name"], description: mealObj["description"], price: mealObj["price"] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  getCatererInfo(docId: string){
    this.catererSubscription = this.afirestore.getCaterer(docId).subscribe( info => {
      this.caterer = info["d"];
    });
    
  } 

  ngOnInit() {
    this.getCatererInfo(this.route.snapshot.paramMap.get("id"));
  }

  ngOnDestroy(){
    this.catererSubscription.unsubscribe();
  }
}