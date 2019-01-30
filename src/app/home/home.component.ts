import { Component, OnInit} from '@angular/core';
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

  //------------- scroll variables
  startX;
  curDown = false;
  scrollLeft;
  //------------- scroll variables
    
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

  //------------- scroll functions 
  
  scrollDrag($event: MouseEvent){
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");
    
    const x = $event.pageX - el["offsetLeft"];
    const y = x - this.startX;

    if(this.curDown === true){
      el.scrollLeft = this.scrollLeft - y;
      }else{
      return;
    }

    
   
  
 }

  holdDrag($event: MouseEvent){
    $event.preventDefault();
    let el = $event.srcElement.closest(".scrolling-wrapper-flexbox");
    this.curDown = true;
    this.startX = $event.pageX - el["offsetLeft"];
    this.scrollLeft = el.scrollLeft;
    
  }

  releaseDrag($event: MouseEvent){
    this.curDown = false;
 
  
  }

  leaveDrag($event:MouseEvent){
    this.curDown = false;
  
  }


  //------------- scroll functions 
  


  ngOnInit() {
    this.carouselHandler.tabChanges.subscribe(x => this.selectedIndex = x);
   
  }
  
 
}
