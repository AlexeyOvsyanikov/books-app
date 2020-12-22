import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {IState} from './store/state';
import {GuardsCheckEnd, GuardsCheckStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {START_ROTATE_SPINNER, STOP_ROTATE_SPINNER} from "./store/actions/spinner.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'books-app';
  public isSpinnerRotate$: Observable<boolean>;

  constructor(
    private store: Store<IState>,
    private router: Router
  ) {

    this.isSpinnerRotate$ = this.store.select('isSpinnerRotate');

    router.events.pipe(
      filter( (e, i) => {
        return e instanceof GuardsCheckStart || e instanceof GuardsCheckEnd;
      })
    ).subscribe(( e ) => {

      if (e instanceof GuardsCheckStart){
        this.store.dispatch(START_ROTATE_SPINNER());
      } else {
        this.store.dispatch(STOP_ROTATE_SPINNER());
      }
    });
  }

}
