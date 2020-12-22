import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/books-app-components/home/home.component';
import {BooksComponent} from './components/books-app-components/books/books.component';
import {AuthorsComponent} from './components/books-app-components/authors/authors.component';
import {UsersComponent} from './components/books-app-components/users/users.component';
import {CheckAccessGuard} from './guards/check-access/check-access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,

  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ CheckAccessGuard ],
    canActivateChild: [ CheckAccessGuard ],
    children: [
      {
        path: '',
        component: BooksComponent
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'authors',
        component: AuthorsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
