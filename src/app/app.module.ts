import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { RestApiProvider } from '../providers/rest-api';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [
    CalendarComponent,
    AppComponent,
    CategoryComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule
  ],
  providers: [
      RestApiProvider],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
