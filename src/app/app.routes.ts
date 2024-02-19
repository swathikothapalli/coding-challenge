import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlightdetailsComponent } from './flightdetails/flightdetails.component';

import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


export const routes: Routes = [
    { path: '', redirectTo:'login',pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'verify-email', component: VerifyEmailComponent},
    { path: 'flightdetails', component: FlightdetailsComponent, canActivate: [AuthGuard]}
  ];