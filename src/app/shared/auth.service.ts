import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface User {
  id?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://auth-4615c-default-rtdb.firebaseio.com/';

  // public uniqueEmail(email: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/users.json`);
  // }

  public createAccount(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/users.json`, { email, password });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(`${this.baseUrl}/users.json`)
      .pipe(
        map((responseData) => {
          const users: User[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              users.push({ id: key, ...responseData[key] });
            }
          }
          return users;
        })
      );
  }


  constructor(private http: HttpClient) { }
}
