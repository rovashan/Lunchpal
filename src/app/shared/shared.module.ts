import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SlideshowModule } from 'ng-simple-slideshow'; // TODO --- Remove package
import { SlickCarouselModule } from 'ngx-slick-carousel'; // ngx-slick-carousel
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Modules
const modules = [
  CommonModule,
  MaterialModule,
  FormsModule,
  SlickCarouselModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
  declarations: []
})
export class SharedModule { }
