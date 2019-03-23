import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SlideshowModule } from 'ng-simple-slideshow'; // TODO --- Remove package
import { SlickCarouselModule } from 'ngx-slick-carousel'; // ngx-slick-carousel
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import {LandingnavComponent} from "../landingnav/landingnav.component";
import {RouterModule} from "@angular/router";

// Modules
const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  GooglePlaceModule,
  SlickCarouselModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    LandingnavComponent
  ],
  declarations: [LandingnavComponent],

})
export class SharedModule { }
