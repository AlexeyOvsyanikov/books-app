import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entity/User';
import { ApiRoutes } from '../../constants/ApiRoutes';
import {ServerResponse} from '../../constants/ServerResponse';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isTokenValid$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  signIn(user: User): Observable<ServerResponse>{
    return this.http.post(
      `${ApiRoutes.host}${ApiRoutes.authorize}`,
      {
        email: user.email,
        password: user.password
      }
    ) as Observable<ServerResponse>;
  }

  checkToken(): Observable<boolean>{
    return this.http.post(
      `${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.checkToken}`,
      {}
    ).pipe(
      map( (response: any) => Boolean(response.code === 200) ),
      catchError( error => of(false) )
    );
  }

}
