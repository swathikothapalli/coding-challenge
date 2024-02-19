import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class AppComponent {
  title = 'coding-challenge';
  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthService){
  }

  isSignedIn(){
    return this.authService.isSignedIn();
  }

  logout(){
    this.authService.logout();
  }
}
