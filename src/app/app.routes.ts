import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './auth/login/login.component';

export const routes: Routes = [

  { path: "", component: HomeComponent, title: "Home"},
  {path: "register", component: RegisterComponent, title: "Register"},
  {path: "login", component: LoginComponent, title: "Login"},

  {path: "**", component: NotFoundComponent, title: "NotFound"},
];
