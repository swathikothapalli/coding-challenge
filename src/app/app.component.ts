import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[
    RouterOutlet,
    MatToolbarModule
  ]
})
export class AppComponent {
  title = 'coding-challenge';
  currentYear: number = new Date().getFullYear();
}
