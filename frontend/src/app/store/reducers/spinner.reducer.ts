import { createReducer, on } from '@ngrx/store';
import { START_ROTATE_SPINNER , STOP_ROTATE_SPINNER } from '../actions/spinner.actions';

export const initialSpinnerState = false;

// tslint:disable-next-line:variable-name
const _spinnerReducer = createReducer(
  initialSpinnerState,
  on(START_ROTATE_SPINNER, (state) => true ),
  on(STOP_ROTATE_SPINNER, (state) => false ),
);

export function spinnerReducer(state: any , action: any ): any {
  return _spinnerReducer(state, action);
}
