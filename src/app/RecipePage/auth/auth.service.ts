import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmIPQYFDABbHUTxyMDp4-rRtqDd2518UM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )));
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmIPQYFDABbHUTxyMDp4-rRtqDd2518UM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )));
  }
  autoLogin(){
    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationData:Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }else{
      console.log(JSON.stringify(userData))
    }

    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationData));
      console.log('NEXT now'+JSON.stringify(loadedUser))
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.router.navigate(['/recipes']);
    }  
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number){
    console.log('TIMEOUT remain='+expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    )
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMes = 'An unknown error occurred!';
    if (!errorRes.error || !errorMes) {
      return throwError(JSON.stringify(errorMes));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXITS': {
        errorMes = 'This email exits already';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMes = 'Wrong password. Please input again.';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMes = 'This email is not existed.';
        break;
      }
      case 'USER_DISABLED': {
        errorMes = 'This user account has been disabled by an adminstrator.';
        break;
      }
      default: {
        errorMes = JSON.parse(JSON.stringify(errorRes.error.error.message));
        break;
      }
    }
    return throwError(errorMes);
  }
}
