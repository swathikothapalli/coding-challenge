import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlightdetailsComponent } from './flightdetails/flightdetails.component';

import { redirectLoggedInTo, canActivate} from '@angular/fire/compat/auth-guard';
import { AuthGuard } from './auth.guard';



export const routes: Routes = [
    { path: '', redirectTo:'login',pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'flightdetails', component: FlightdetailsComponent}, //canActivate: [AuthGuard]}
  ];