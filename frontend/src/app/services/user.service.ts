import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/User';
import { ApiRoutes } from '../constants/ApiRoutes';
import {ServerResponse} from "../constants/ServerResponse";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

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
}
