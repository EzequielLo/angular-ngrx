import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRespData } from '../models/auth-resp-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  timeOutIntervale!: any;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true });
  }

  formatUser(data: AuthRespData) {
    const expiresDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(
      data.email,
      data.idToken,
      data.loaclId,
      expiresDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'EMAIL_EXISTS':
        return 'Email already exists ';
      default:
        return 'Unknown error';
    }
  }

  signUp(email: string, password: string): Observable<AuthRespData> {
    return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true });
  }

  setUserLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeIntervale(user);
  }

  runTimeIntervale(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;
    this.timeOutIntervale = setTimeout(() => { }, timeInterval);
  }

  getUserFromLocalStorage() {
    const data = localStorage.getItem('userData');
    if (data) {
      const userData = JSON.parse(data);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeIntervale(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeOutIntervale) {
      clearTimeout(this.timeOutIntervale);
      this.timeOutIntervale = null;
    }
  }

}
