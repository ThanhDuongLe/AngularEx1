// export class category{
//     constructor(public name:string){}
// }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';



@NgModule({
  declarations: [
      AlertComponent,
      LoadingSpinnerComponent,
      PlaceholderDirective,
      DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
      AlertComponent,
      LoadingSpinnerComponent,
      PlaceholderDirective,
      DropdownDirective,
      CommonModule
  ],
  entryComponents: [
    DialogAlertComponent,   //should add this entry to show dialog
    AlertComponent,
  ] 
})

export class SharedModule { }
