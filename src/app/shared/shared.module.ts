import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow'; // ng-simple-slider carousel
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// Modules
const modules = [
  CommonModule,
  MaterialModule,
  SlideshowModule,
  FormsModule,
  
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
