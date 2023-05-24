import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from '../app/practice/practice.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdaptivecardsComponent } from './adaptivecards/adaptivecards.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, 
      children:[{
      path: 'practice', component:PracticeComponent
    },
  {
    path: 'adaptivecards', component:AdaptivecardsComponent
  }]
},
  { path: 'login', component:LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }