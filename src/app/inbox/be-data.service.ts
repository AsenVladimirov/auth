import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map, take, exhaustMap, Observable, tap } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class BeDataService {

  private baseUrl = 'https://auth-4615c-default-rtdb.firebaseio.com/email.json';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  pushData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        return this.http.post(
          this.baseUrl,
          {
            email: 'lucrowend123@gmail.com',
            password: 'password'
          },
          {
            params: new HttpParams().set('auth', user?.token!)
          }
        )
      })
    )
  }

  fetchData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        return this.http.get<{ [key: string]: { email: string, password: string } }>(
          this.baseUrl,
          { params: new HttpParams().set('auth', user?.token!) }
        );
      })
    ).pipe(
      map((data: { [key: string]: { email: string, password: string } }) => {
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] })
        }
        return arr;
      })
    )
  }
}
