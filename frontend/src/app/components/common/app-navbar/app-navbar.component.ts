import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-localstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {

    this.localStorageService.remove('user');
    this.router.navigateByUrl('/sign-in');

  }
}
