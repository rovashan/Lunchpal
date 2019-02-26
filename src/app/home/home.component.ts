import { Component, OnInit } from '@angular/core';
import { CarouselHandlerService } from "../carousel-handler.service";

import { ViewEncapsulation } from "@angular/core";
import { AfirestoreService } from '../afirestore.service';
import { toArray } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  title = 'app';
  classicMenu: any;

  constructor(private carouselHandler: CarouselHandlerService,
    private afirestore: AfirestoreService, ) { }


  //------------- scroll variables
  startX;
  curDown = false;
  scrollLeft;
  //------------- scroll variables


  goNext($event: Event) {
    this.carouselHandler.goNext($event);

  }

  goPrev($event: Event) {
    this.carouselHandler.goPrev($event);
  }

  //------------- scroll functions 

  scrollDrag($event: MouseEvent) {
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");

    const x = $event.pageX - el["offsetLeft"];
    const y = x - this.startX;

    if (this.curDown === true) {
      el.scrollLeft = this.scrollLeft - y;
    } else {
      return;
    }

  }

  holdDrag($event: MouseEvent) {
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");
    this.curDown = true;
    this.startX = $event.pageX - el["offsetLeft"];
    this.scrollLeft = el.scrollLeft;

  }

  releaseDrag($event: MouseEvent) {
    this.curDown = false;


  }

  leaveDrag($event: MouseEvent) {
    this.curDown = false;

  }


  //------------- scroll functions 

  ngOnInit() {
    this.getClassicMenu();
  }

  getClassicMenu() {
    this.afirestore.getClassicMenu().subscribe(items => {
      console.log('classicMenu: ', items);
      this.classicMenu = items;
    })
  }


}
