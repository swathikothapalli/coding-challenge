import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { AuthService } from '../auth.service';
import {passwordValidator} from '../../utils'


import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registerForm: FormGroup;
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void{
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, [Validators.required, passwordValidator()]]
    });
  }

  register() {
    if (!this.registerForm.valid) {
      console.log(this.registerForm)
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.authService.register(email, password);
  }

  navigateToLogin(){
    this.router.navigateByUrl('login');
  }
}