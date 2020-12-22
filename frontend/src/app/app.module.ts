import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxLocalStorageModule } from 'ngx-localstorage';
import { StoreModule } from '@ngrx/store';
import { spinnerReducer } from './store/reducers/spinner.reducer';
import { userReducer } from './store/reducers/user.reducer';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/books-app-components/home/home.component';
import { BooksComponent } from './components/books-app-components/books/books.component';
import { AppNavbarComponent } from './components/common/app-navbar/app-navbar.component';
import { AuthorsComponent } from './components/books-app-components/authors/authors.component';
import { UsersComponent } from './components/books-app-components/users/users.component';
import { AuthCheckInterceptor } from './interceptors/auth-check.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    BooksComponent,
    AppNavbarComponent,
    AuthorsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    StoreModule.forRoot({isSpinnerRotate: spinnerReducer , user: userReducer}),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthCheckInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
