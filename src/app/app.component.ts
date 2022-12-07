import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      console.log('router --> ', this.router);
      // if (user) {
      //   this.router.navigateByUrl('/inbox');
      // }
      setTimeout(() => this.user = user, 0);
    });
  }
}
