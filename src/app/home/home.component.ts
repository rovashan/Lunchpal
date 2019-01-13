import { Component, OnInit } from '@angular/core';
import { CarouselHandlerService } from "../carousel-handler.service";
import { MatTabChangeEvent } from '@angular/material';

import {ViewEncapsulation} from "@angular/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  title = 'app';

  constructor(private carouselHandler: CarouselHandlerService) { }

  selectedIndex= this.carouselHandler.selectedIndex;

  goNext(){
    this.carouselHandler.goNext()
  }

  goPrev(){
    this.carouselHandler.goPrev();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  this.carouselHandler.tabChanged(tabChangeEvent);
  
  }



  ngOnInit() {
    this.carouselHandler.tabChanges.subscribe(x => this.selectedIndex = x);
  }

}
