import { Component, OnInit } from '@angular/core';
import {CarouselHandlerService} from "../carousel-handler.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'app';

  constructor(private carouselHandler: CarouselHandlerService, 
    private authService: AuthService) { }

  menuSelected: string;
  imageSources: string[];


   menuHandler($event: Event){
     this.carouselHandler.menuHandler($event);
   } 
  
  ngOnInit() {
    this.carouselHandler.sourcesChange.subscribe(x => this.imageSources = x);
    this.carouselHandler.labelsChange.subscribe(x => this.menuSelected = x);
    this.authService.user.subscribe(user => {
      console.log(user);
    });
  }

}
