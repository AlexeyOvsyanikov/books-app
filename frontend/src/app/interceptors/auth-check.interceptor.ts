import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { Store } from '@ngrx/store';
import { IState } from '../store/state';

@Injectable()
export class AuthCheckInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
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


      return next.handle(request);
    }

    return next.handle(req);
  }
}
