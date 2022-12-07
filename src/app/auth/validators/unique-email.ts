import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
    validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.authService.signedin(control.value).pipe(
            map((value) => {
                return value.registered ? of({ emailAvailable: false }) : null;
            })
        );
    }

    constructor(private authService: AuthService) { }
}