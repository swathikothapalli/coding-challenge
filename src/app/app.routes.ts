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

    { 
      path: 'register', 
      loadComponent: ()=> import('../app/signup/signup.component').then(c => c.SignupComponent) 
    },

    { path: 'forgot-password',
      loadComponent: ()=> import('../app/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },

    { 
      path: 'verify-email', 
      loadComponent: ()=> import('../app/verify-email/verify-email.component').then(c => c.VerifyEmailComponent)
    },

    { 
      path: 'flightdetails', 
      loadComponent: ()=> import('../app/flightdetails/flightdetails.component').then(c => c.FlightdetailsComponent), 
      canActivate: [AuthGuard]
    }
  ];