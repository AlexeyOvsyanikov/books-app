import { createReducer, on } from '@ngrx/store';
import { SAVE_USER , ERASE_USER } from '../actions/user.actions';
import { User } from '../../entity/User';

export const initialUserState: User = {
  email: '',
  password: '',
  confirmPassword: ''
};

// tslint:disable-next-line:variable-name
const _userReducer = createReducer(
  initialUserState,
  on(SAVE_USER, (state) => ( {...state , email: state.email , password: state.password} ) ),
  on(ERASE_USER, (state) => ( {...state , email: '' , password: ''} ) ),
);

export function userReducer(state: any , action: any ): any {
  return _userReducer(state, action);
}
