import { Component, OnInit } from '@angular/core';
import { CarouselHandlerService } from "../carousel-handler.service";


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

  
  menuSelected: string;
  imageSources: string[];

  menuHandler($event: Event) {
    this.carouselHandler.menuHandler($event);
  }

  ngOnInit() {
    this.carouselHandler.sourcesChange.subscribe(x => this.imageSources = x);
    this.carouselHandler.labelsChange.subscribe(x => this.menuSelected = x);
  }

}
