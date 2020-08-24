import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

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

  constructor(private http: HttpClient) { }

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
  logout(){
    this.user.next(null);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
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
