import { Component, OnInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    SharedModule
  ]
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
    this.router.navigate(['forgot-password']);
  }

  navigateToRegister(){
    this.router.navigateByUrl('register');
  }
}
