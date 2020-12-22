import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'ngx-localstorage';

import { User } from '../../entity/User';
import { UserService } from '../../services/user/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IState} from '../../store/state';

import { START_ROTATE_SPINNER , STOP_ROTATE_SPINNER } from '../../store/actions/spinner.actions';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.min(20)])
  });

  public hide = true;
  public authErrorMessage = '';
  public isSpinnerRotate$: Observable<boolean>;

  public user = new User();

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<IState>
  ) {
      this.isSpinnerRotate$ = store.select('isSpinnerRotate');
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.signInForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signInForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.signInForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signInForm.controls.password.hasError('password') ? 'Password ' : '';
  }

  signIn(): void{

    this.store.dispatch(START_ROTATE_SPINNER());

    this.userService.signIn(this.user).subscribe(
      res => {
        this.authErrorMessage = '';

        this.localStorageService.set('user', {
          email: this.user.email,
          token: res.token
        });

        this.store.dispatch(STOP_ROTATE_SPINNER());
        this.router.navigateByUrl('home');
      },
      err => {
        this.authErrorMessage = err.error.message;
        this.store.dispatch(STOP_ROTATE_SPINNER());
      }
    );

  }
}
