import { NgModule } from '@angular/core';
import { MatToolbarModule,
   MatProgressBarModule,
   MatExpansionModule,
   MatCardModule,
   MatDatepickerModule,
   MatStepperModule,
   MatNativeDateModule } from '@angular/material';

// Modules
const modules = [
  MatToolbarModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCardModule
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
export class MaterialModule { }
