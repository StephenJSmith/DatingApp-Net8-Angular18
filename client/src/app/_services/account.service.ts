import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'Http://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model: any) {
    const url = this.baseUrl + 'account/login';

    return this.http.post<User>(url, model)
      .pipe(
        map(user => {
          if (user) {
            const json = JSON.stringify(user);
            localStorage.setItem('user', json);
            this.currentUser.set(user);
          }

          return user;
        })
      );
  }

  register(model: any) {
    const url = this.baseUrl + 'account/register';

    return this.http.post<User>(url, model)
      .pipe(
        map(user => {
          if (user) {
            const json = JSON.stringify(user);
            localStorage.setItem('user', json);
            this.currentUser.set(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
