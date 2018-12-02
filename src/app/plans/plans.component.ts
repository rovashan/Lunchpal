import { Component, OnInit } from '@angular/core';
import {CarouselHandlerService} from "../carousel-handler.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor(private carouselHandler: CarouselHandlerService) { }  
  
  menuSelected: string = this.carouselHandler.menuOneString;
  imageSources: string[] = this.carouselHandler.menuOne;

  menuHandler($event: Event){
    $event.preventDefault();
    
    let currentID = $event.target["id"];
    //check the ID of the plan selected
    if(currentID === "menuOne"){
      //set the images array to be the array of images for the menu
      console.log("menu one is selected");
      this.imageSources = this.carouselHandler.menuOne;
      this.menuSelected = this.carouselHandler.menuOneString;
     
      }
    else if (currentID === "menuTwo"){
      console.log("menu two is selected");
      this.imageSources = this.carouselHandler.menuTwo; 
      this.menuSelected = this.carouselHandler.menuTwoString;
     
    }
    else if (currentID === "menuThree"){
      console.log("menu three is selected");
      this.imageSources = this.carouselHandler.menuThree;
      this.menuSelected = this.carouselHandler.menuThreeString;
      
    }
  
  }
  
   ngOnInit() {
  }

}
