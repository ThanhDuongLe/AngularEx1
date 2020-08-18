import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { MaterialImport } from './Material/Material.module';
import { SetupFinanciesComponent } from './setup-financies/setup-financies.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';

@NgModule({
  declarations: [		
    AppComponent,
      SetupFinanciesComponent,
      SecondPageComponent,
      DialogAlertComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialImport,
  ],
  providers: [
    MaterialImport
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogAlertComponent] //should add this entry to show dialog
})
export class AppModule { }
