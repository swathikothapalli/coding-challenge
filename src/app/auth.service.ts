import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(public fireauth: AngularFireAuth, private router: Router, private _logger: LogService) { }

  login(email: string, password: string){
    this.fireauth
    .signInWithEmailAndPassword(email,password)
    .then(() => {
      localStorage.setItem('isSignedIn', 'true');
      this.router.navigate(['/flightdetails']);
    }, err => {
      // need to implement toast component
      //this._logger.log(`error ${err} occured during login`)
      console.log(err);
      this.router.navigate(['/login']);
    })
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
      //toast component
      this.router.navigate(['/login'])
      this.sendEmailForVerification(res.user);
    },err => {
      //toast component
      //this._logger.log(`error ${err} occured during registration`)
      this.router.navigate(['/register'])
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
      localStorage.setItem('isSignedIn', 'true');
      this.router.navigate(['/flightdetails'])
    }, err => {
      // show error through toast message
      //this._logger.log(`error ${err} occured during google login`)
    })
  }
}
