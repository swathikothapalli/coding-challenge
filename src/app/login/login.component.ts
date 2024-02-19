import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService
    .signInWithEmailAndPassword(email, password)
    .then(()=> {
      if(localStorage.getItem('isSignedIn') == null){
        localStorage.setItem('isSignedIn', 'true');
      }
      this.router.navigate(['/flightdetails']);
    }).catch(()=> {
      this.snackbar.open('Invalid Credentials', '',{duration: 3000, horizontalPosition: 'center', verticalPosition:'top'})
      this.loginForm.reset();
      this.formDirective.resetForm();
    });
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
