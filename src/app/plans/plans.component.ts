import { Component, OnInit } from '@angular/core';
import {CarouselHandlerService} from "../carousel-handler.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor(private carouselHandler: CarouselHandlerService) { }  
  
  menuSelected: string;
  imageSources: string[];


   menuHandler($event: Event){
     this.carouselHandler.menuHandler($event);
   } 
  
  ngOnInit() {
    this.carouselHandler.sourcesChange.subscribe(x => this.imageSources = x);
    this.carouselHandler.labelsChange.subscribe(x => this.menuSelected = x);
  }

}
