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
      //localStorage.setItem('isloggedin', 'true');
      this.router.navigate(['/flightdetails']);
    }, err => {
      // need to implement toast component
      //this._logger.log(`error ${err} occured during login`)
      console.log(err);
      this.router.navigate(['/login']);
    })
  }


  register(email: string, password: string){
    this.fireauth
    .createUserWithEmailAndPassword(email,password)
    .then(()=> {
      //toast component
      this.router.navigate(['/login'])
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
      this.router.navigate(['/flightdetails'])

    }, err => {
      // show error through toast message
      //this._logger.log(`error ${err} occured during google login`)
    })
  }
}
