import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatError, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';
import { Router } from '@angular/router';

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

import {NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DateTime } from 'luxon';

import {formatDate} from '../../utils';


@Component({
  selector: 'app-flightdetails',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    MatLabel,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    //HttpClient,
    //provideNativeDateAdapter()
  ],
  templateUrl: './flightdetails.component.html',
  styleUrl: './flightdetails.component.css'
})
export class FlightdetailsComponent {

  flightForm: FormGroup;
  ngxTimepicker: NgxMaterialTimepickerComponent
  minDate: Date;
  minTime: DateTime

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {
    this.flightForm = this.fb.group({
      airline: [''],
      arrivalDate: [''],
      arrivalTime: [''],
      flightNumber: [''],
      numOfGuests: [''],
      comments: ['']
    });
    
    this.minDate = new Date();
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    const formData = this.flightForm.value;
    const details = {...formData, arrivalDate: formatDate(formData?.arrivalDate)}
    console.log(details);
    
    this.http.post(environment.apiEndPoint, details).subscribe(
      (response: any) => {
        if (response === true) {
          this.snackBar.open('Details submitted successfully', '', { duration: 3000 });
          this.router.navigateByUrl('flightdetails')
        } else {
          this.snackBar.open('Error submitting flight details', '', { duration: 3000 });
        }
      },
      (error: any) => {
        this.snackBar.open('Error submitting flight details', '', { duration: 3000 });
      }
    );
  }
}
