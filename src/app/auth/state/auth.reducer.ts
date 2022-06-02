import { Action, createReducer, on } from "@ngrx/store";
import { autoLogOut, loginSuccess, signUpSuccess } from "./auth.actions";
import { AuthState, initialState } from "./auth.state";

const _authReducer = createReducer(initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(autoLogOut, (state) => {
    return {
      ...state,
      user: null
    }
  }),
);

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
