import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(public fireauth: AngularFireAuth, private router: Router, private snackbar: MatSnackBar) { }


  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  sendEmailForVerification(user : any) {
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  register(email: string, password: string){
    this.fireauth
    .createUserWithEmailAndPassword(email,password)
    .then((res)=> {
      this.snackbar.open('Successfully registered', '',{duration: 3000, horizontalPosition: 'center', verticalPosition:'top'})
      this.router.navigate(['/login'])
      //this.sendEmailForVerification(res.user);
    },err => {
      const errorCode = err.code;
      if(errorCode == "auth/email-already-in-use"){
        this.snackbar.open('Email already registered', '',{duration: 3000, horizontalPosition: 'center', verticalPosition:'top'})
        this.router.navigate(['/login'])
      } else {
        this.snackbar.open('Something went wrong', '',{duration: 3000, horizontalPosition: 'center', verticalPosition:'top'});
        this.router.navigate(['/register']);
      }    
    })
  }

  logout() {
    this.fireauth
    .signOut()
    .then(()=>{
      localStorage.removeItem('isSignedIn');
      this.router.navigate(['/login'])
    }, err => {
      //toast message
      //this._logger.log(`error ${err} occured during logout`)
    })
  }

  signWithGoogle(){
    return this.fireauth
    .signInWithPopup(new GoogleAuthProvider)
    .then(()=>{
      if(localStorage.getItem('isSignedIn') == null){
        localStorage.setItem('isSignedIn', 'true');
      }
      this.router.navigate(['/flightdetails'])
    }, err => {
      this.snackbar.open('Login failed', '',{duration: 3000, horizontalPosition: 'center', verticalPosition:'top'});
    })
  }
}
