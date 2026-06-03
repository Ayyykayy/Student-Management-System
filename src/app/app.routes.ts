import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'students/add',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-student/add-student').then(m => m.AddStudentComponent)
  },
  {
    path: 'students/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/edit-student/edit-student').then(m => m.EditStudentComponent)
  },
  {
    path: 'students',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/student-list/student-list').then(m => m.StudentListComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];