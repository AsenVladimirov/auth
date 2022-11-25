import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueEmail } from '../validators/unique-email';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ], [
      this.uniqueEmail.validate
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordConfirmation: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ])
  }, {
    validators: [this.matchPasswordValidator.validate]
  });

  constructor(
    private matchPasswordValidator: MatchPassword,
    private authService: AuthService,
    private uniqueEmail: UniqueEmail
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;

    this.authService.createAccount(email, password)
      .subscribe((response) => {
        console.log(response)
      });
  }

  public showErrorIcon(controlName: string, control: AbstractControl | null): boolean {
    if (control?.errors && control?.touched) {
      return true;
    }

    if (control?.touched && this.form?.errors?.passwordsDontMatch && controlName === 'passwordConfirmation') {
      return true
    }
    return false;
  }

  public displayErrors(controlName: string, control: AbstractControl | null) {
    if (controlName === 'email') {
      if (control?.errors?.required) {
        return 'Email is required';
      } else if (control?.errors?.email) {
        return 'Invalid email';
      } else if (!control?.errors?.emailAvailable) {
        return 'Email already in use';
      }
    }

    if (controlName === 'password') {
      if (control?.errors?.required) {
        return 'Password is required';
      } else if (control?.errors?.minlength) {
        return `Password should be at least ${control?.errors?.minlength.requiredLength} characters`;
      }
    }

    if (controlName === 'passwordConfirmation') {
      if (control?.errors?.required) {
        return 'Password is required';
      } else if (this.form?.errors?.passwordsDontMatch) {
        return "Passwords don't match";
      }
    }

    return 'debug';
  }

  public get email(): AbstractControl | null { return this.form.get('email') }
  public get password(): AbstractControl | null { return this.form.get('password') }
  public get passwordConfirmation(): AbstractControl | null { return this.form.get('passwordConfirmation') }
}
