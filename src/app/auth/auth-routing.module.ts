import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignoutComponent } from './signout/signout.component';
import { SignedinGuard } from './signedin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    canActivate: [SignedinGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [SignedinGuard],
    component: LoginComponent
  },
  { path: 'signout', component: SignoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
