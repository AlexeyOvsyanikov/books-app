import { createReducer, on } from '@ngrx/store';
import { START_ROTATE_SPINNER , STOP_ROTATE_SPINNER } from '../actions/spinner.actions';

import { State } from '../state';

// tslint:disable-next-line:variable-name
const _spinnerReducer = createReducer(
  State,
  on(START_ROTATE_SPINNER, (state) => ({ ...state, isSpinnerRotate: true })),
  on(STOP_ROTATE_SPINNER, (state) => ({ ...state, isSpinnerRotate: false })),
);

export function spinnerReducer(state: any , action: any ): any {
  return _spinnerReducer(state, action);
}
