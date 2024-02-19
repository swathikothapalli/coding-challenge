import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar'; 
import {NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {formatDate} from '../../utils';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-flightdetails',
  standalone: true,
  imports: [
    SharedModule,
    HttpClientModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './flightdetails.component.html',
  styleUrl: './flightdetails.component.css'
})
export class FlightdetailsComponent {

  flightForm: FormGroup;
  ngxTimepicker: NgxMaterialTimepickerComponent
  minDate: Date;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfGuests: [1, [Validators.required, Validators.min(1)]],
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
        if (response == true) {
          this.snackBar.open('Details submitted successfully', '', { duration: 3000,panelClass:['success'] });
          this.router.navigate(['flightdetails'])
        } else {
          this.snackBar.open('Error submitting flight details', '', { duration: 3000, panelClass:['failed'] });
        }
      },
      (error: any) => {
        this.snackBar.open('Error submitting flight details', '', { duration: 3000 });
      }
    );
  }
}
