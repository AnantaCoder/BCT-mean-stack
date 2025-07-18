import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Todolist } from './todolist/todolist';
// import { RegisterComponent } from './register/register';
// import { LoginComponent } from './login/login';
// import { Navbar } from './navbar/navbar';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'todolist',
    component: Todolist,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.LoginComponent),
  },
];
