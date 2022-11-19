import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uniqueEmail(email: string): Observable<{ uniqueEmail: boolean } | null> {
    if (email === 'lucrowend123@gmail.com') {
      return of({ uniqueEmail: false })
    }
    return of(null)
  }

  constructor() { }
}
