import { NgModule } from '@angular/core';
import { MatToolbarModule,
   MatProgressBarModule,
   MatExpansionModule,
   MatCardModule,
   MatDatepickerModule,
   MatStepperModule,
   MatNativeDateModule,
   MatRadioModule,
   MatTabsModule,
   MatFormFieldModule,
   MatInputModule,
   MatProgressSpinnerModule,
   MatChipsModule,
   MatSelectModule,
   MatSlideToggleModule,
   MatIconModule
  } from '@angular/material';

// Modules
const modules = [
  MatToolbarModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCardModule,
  MatRadioModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule ,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatIconModule
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
