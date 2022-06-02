import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, tap, mergeMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { autoLogin, autoLogOut, loginStart, loginSuccess, signUpStart, signUpSuccess } from "./auth.actions";

@Injectable()

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(map((data) => {
            this.store.dispatch(setLoadingSpinner({ state: false }));
            this.store.dispatch(setErrorMessage({ message: "" }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return loginSuccess({ user });
          }), catchError(errResp => {
            this.store.dispatch(
              setLoadingSpinner({ state: false })
            );
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage })
            );
          })
          );
      })
    )
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(ofType(...[loginSuccess, signUpSuccess]),
      tap(() => this.router.navigate(['/'])))
  }, { dispatch: false });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(ofType(signUpStart),
      exhaustMap(Action => {
        return this.authService.signUp(
          Action.email, Action.password
        ).pipe(
          map(data => {
            this.store.dispatch(setLoadingSpinner({ state: false }));
            this.store.dispatch(setErrorMessage({ message: "" }));
            const user = this.authService.formatUser(data);
            this.authService.setUserLocalStorage(user);
            return signUpSuccess({ user });
          }), catchError(errResp => {
            this.store.dispatch(
              setLoadingSpinner({ state: false })
            );
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage })
            );
          })
        );
      }))
  })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authService.getUserFromLocalStorage()!;
        return of(loginSuccess({ user }));
      })
    )
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogOut),
        map(() => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );

}
