import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { signUpStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  singupForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSingupSubmit() {
    if (this.singupForm.invalid) {
      return;
    }
    const email = this.singupForm.value.email;
    const password = this.singupForm.value.password;
    this.store.dispatch(setLoadingSpinner({ state: true }));
    this.store.dispatch(signUpStart({ email, password }));
  }
}
