import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthCheckInterceptor } from './interceptors/auth-check.interceptor';

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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/books-app-components/home/home.component';
import { BooksComponent } from './components/books-app-components/books/books.component';
import { AppNavbarComponent } from './components/common/app-navbar/app-navbar.component';
import { AuthorsComponent } from './components/books-app-components/authors/authors.component';
import { UsersComponent } from './components/books-app-components/users/users.component';
import { ConfirmComponent } from './components/common/dialog/confirm/confirm.component';
import { UpdateAuthorComponent } from './components/common/dialog/update-author/update-author.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    BooksComponent,
    AppNavbarComponent,
    AuthorsComponent,
    UsersComponent,
    ConfirmComponent,
    UpdateAuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    StoreModule.forRoot({isSpinnerRotate: spinnerReducer, user: userReducer}),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthCheckInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
