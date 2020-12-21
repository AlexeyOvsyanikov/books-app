import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'books-app';
  public isSpinnerRotate$: Observable<boolean>;

  constructor(
    private store: Store<{ isSpinnerRotate: boolean }>
  ) {
    this.isSpinnerRotate$ = this.store.select('isSpinnerRotate');
  }

}
