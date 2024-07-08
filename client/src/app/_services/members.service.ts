import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/members';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    const url = `${this.baseUrl}users`;

    return this.http.get<Member[]>(url).subscribe({
      next: (members) => this.members.set(members),
    });
  }

  getMember(username: string) {
    const member = this.members().find(x => x.username == username);
    if (member !== undefined) return of(member);

    const url = `${this.baseUrl}users/${username}`;

    return this.http.get<Member>(url);
  }

  updateMember(member: Member) {
    const url = `${this.baseUrl}users`;

    return this.http.put(url, member)
    .pipe(
      tap(() => {
        this.members.update(members => members.map(m => 
          m.username === member.username
            ? member
            : m
        ))
      }) 
    );
  }
}
