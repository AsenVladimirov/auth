import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { AuthService } from '../../shared/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
    validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.authService.getUsers().pipe(
            map((users) => {
                for (let user of users) {
                    if (user.email === control.value) {
                        return of({ emailAvailable: false })
                    }
                }
                return null;
            })
        );
    }

    constructor(private authService: AuthService) { }
}