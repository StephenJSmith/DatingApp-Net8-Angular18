import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  login(model: any) {
    const url = this.baseUrl + 'account/login';

    return this.http.post<User>(url, model)
      .pipe(
        map(user => {
          if (user) {
            this.setCurrentUser(user);
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
            this.setCurrentUser(user);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
}

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
