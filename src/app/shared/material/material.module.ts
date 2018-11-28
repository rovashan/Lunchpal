import { NgModule } from '@angular/core';
import { MatToolbarModule, MatProgressBarModule, MatExpansionModule, MatCardModule } from '@angular/material';

// Modules
const modules = [
  MatToolbarModule,
  MatProgressBarModule,
  MatExpansionModule,
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
