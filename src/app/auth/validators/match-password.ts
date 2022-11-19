import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        if (control.get('password')?.value === control.get('passwordConfirmation')?.value) {
            return null;
        }
        return { passwordsDontMatch: true };
    }
}