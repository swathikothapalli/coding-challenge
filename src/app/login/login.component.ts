import { Component, OnInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidatorFn} from '@angular/forms';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    MatLabel,
    MatIconModule,
    MatTooltipModule
  ],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const hasSpecialCharacters = /[!@#$%^&*()]/.test(password);
    const hasMinimumLength = password.length >= 8;
  
    if (!hasSpecialCharacters || !hasMinimumLength) {
      return { invalidPassword: true };
    }
    
    return null;
  };

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, [Validators.required, Validators.min(8), ]]
    },{ validator:this.passwordValidator });
  }

  login() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm);
      return;
    }

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    console.log(this.loginForm.value);
    this.authService.login(email, password);
  }

  signInWithGoogle() {
    this.authService.signWithGoogle();
  }

  forgotPassword(){

  }

  navigateToRegister(){
    this.router.navigateByUrl('register');
  }
}
