import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BoostFormComponent } from './boost-form/boost-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoostInfoComponent } from './boost-info/boost-info.component';
@NgModule({
  declarations: [
    AppComponent,
    BoostFormComponent,
    BoostInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
