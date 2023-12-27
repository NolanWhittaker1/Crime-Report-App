import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CitymapComponent } from './citymap/citymap.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { ReportViewComponent } from './report-view/report-view.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ReportListComponent,
    ReportAddFormComponent,
    CitymapComponent,
    ReportViewComponent,
    MainComponent,
    LoginComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
