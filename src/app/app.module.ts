import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { RestApiProvider } from '../providers/rest-api';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryComponent } from './categories/category.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    CalendarComponent,
    TasksComponent,
    CategoryComponent,
    AppComponent
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
