import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { R3BoundTarget } from '@angular/compiler';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CitymapComponent } from './citymap/citymap.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {path: 'report/add/:lat/:long', component: ReportAddFormComponent},
    {path: 'report/:id', component: ReportViewComponent},
    {path: 'login/:id', component: LoginComponent},
    {path: 'main', component: MainComponent},
    {path: '', redirectTo: '/main', pathMatch: 'full'}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
