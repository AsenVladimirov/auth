import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
    validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.authService.uniqueEmail(control.value);
    }

    constructor(private authService: AuthService) { }
}