import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    const { email, password } = this.form.value;
    this.authService.signin(email, password).subscribe({
      next: (resData) => {
        // TODO: make so that "/inbox" is a route that is sent from the app component
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {

      }
    })
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

}
