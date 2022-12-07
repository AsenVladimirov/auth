import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

export interface SignupResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface SigninResponseData {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<SignupResponseData> {
    return this.http.post<SignupResponseData>
      (
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMy92zmlnNSQ-eZ0FZ0A-EbUl5Ln0F44E',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new User(resData.localId, resData.email, resData.idToken, expirationDate);
          localStorage.setItem('userData', JSON.stringify(user));
          this.user.next(user);
        })
      );
  }

  signin(email: string, password: string): Observable<SigninResponseData> {
    return this.http.post<SigninResponseData>
      (
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMy92zmlnNSQ-eZ0FZ0A-EbUl5Ln0F44E',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new User(resData.localId, resData.email, resData.idToken, expirationDate);
          localStorage.setItem('userData', JSON.stringify(user));
          this.user.next(user);
        })
      );
  }

  signout(): void {
    localStorage.removeItem('userData');
    this.user.next(null);
  }

  signedin(email: string): Observable<{ registered: boolean }> {
    return this.http.post<{ registered: boolean }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyBMy92zmlnNSQ-eZ0FZ0A-EbUl5Ln0F44E',
      {
        identifier: email,
        continueUri: 'http://localhost:4200'
      }
    );
  }

  autoLogin(): void {
    const userDataString: string | null = localStorage.getItem('userData');
    if (!userDataString) {
      return;
    }

    const userDataObj: {
      id: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userDataString);

    const user = new User(
      userDataObj.id,
      userDataObj.email,
      userDataObj._token,
      new Date(userDataObj._tokenExpirationDate)
    );

    if (user.token) {
      this.user.next(user);
    }
  }
}
