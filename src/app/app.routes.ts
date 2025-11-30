import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./home/home').then((m) => m.Home);
        },
      },
      {
        path: 'users-create',
        loadComponent: () => {
          return import('./user-create/user-create').then((m) => m.UserCreate);
        },
      },
      {
        path: 'users-edit/:id',
        loadComponent: () => {
          return import('./user-edit/user-edit').then((m) => m.UserEdit);
        },
      },
      {
        path: 'users-edit-password/:id',
        loadComponent: () => {
          return import('./user-change-password/user-change-password').then(
            (m) => m.UserChangePassword
          );
        },
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => {
          return import('./login/login').then((m) => m.Login);
        },
      },
      {
        path: 'register',
        loadComponent: () => {
          return import('./register/register').then((m) => m.Register);
        },
      },
    ],
  },
];
