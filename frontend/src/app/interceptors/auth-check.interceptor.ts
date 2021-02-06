import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'ngx-localstorage';
import { Store } from '@ngrx/store';
import { IState } from '../store/state';
import {tap} from 'rxjs/operators';
import {STOP_ROTATE_SPINNER} from '../store/actions/spinner.actions';


@Injectable()
export class AuthCheckInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private store: Store<IState>
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user = this.localStorageService.get('user');

    if (user){

      const token = user.token || '';

      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      request.headers.append('Authorization', `Bearer ${token}`);

      return next.handle(request).pipe(
        tap(
          (event) => {},
          (error) => {
            if (error instanceof HttpErrorResponse) {

              this.store.dispatch( STOP_ROTATE_SPINNER() );

              switch (error.status){

                case 401:
                  this.router.navigateByUrl('/sign-in');
                  break;

                case 500:
                  this.snackBar.open('Internal server error. We already works on this issue!', 'Close' , {
                    panelClass: 'error-snackbar',
                    duration: 4000
                  });
                  break;

              }

            }
          }
        )
      );
    }

    return next.handle(req);
  }
}
