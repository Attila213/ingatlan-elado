import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HousePageComponent } from './house-page/house-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path :'login',component:LoginComponent},
  {path :'register',component:RegisterComponent},
  {path :'house/:id',component:HousePageComponent,canActivate: [authGuard]},
  {path :'dashboard',component:DashboardComponent,canActivate: [authGuard]}
];
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }