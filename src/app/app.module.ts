import { NgModule } from "@angular/core";

import { routes } from './app.routes';
import { RouterOutlet } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from "../../environments/enviroment";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { FlightdetailsComponent } from "./flightdetails/flightdetails.component";

import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthGuard } from "./auth.guard";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";

import { HttpClient } from '@angular/common/http';

@NgModule({
    imports: [
        // BrowserModule,
        // BrowserAnimationsModule,
        // AngularFireAuthModule,
        // HttpClientModule,
        // MatToolbarModule,
        //RouterOutlet,
        // MatToolbarModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        FlightdetailsComponent
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }