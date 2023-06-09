import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'send-reset-email',component:ForgetpasswordComponent},
  { path: 'reset-password/:token',component:ResetpasswordComponent},
  { path: 'dashboard',component:DashboardComponent},
  { path: 'dashboard/:id',component:DashboardComponent},
  { path: 'booking',component:BookingComponent},
  //Modules
  {path:  'admin', loadChildren:()=>import('./admin/admin.module').then(a=>a.AdminModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
