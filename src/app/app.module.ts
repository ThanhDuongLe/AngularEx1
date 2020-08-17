import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { MaterialImport } from './Material/Material.module';
import { SetupFinanciesComponent } from './setup-financies/setup-financies.component';
import { SecondPageComponent } from './second-page/second-page.component';

@NgModule({
  declarations: [		
    AppComponent,
      SetupFinanciesComponent,
      SecondPageComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
