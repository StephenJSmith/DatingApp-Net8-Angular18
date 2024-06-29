import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RegisterComponent],
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode() {
    this.registerMode = false;
  }

  getUsers() {
    const url = 'http://localhost:5001/api/users';
    this.http.get(url).subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.error(error),
      complete: () => console.log(this.users),
    });
  }
}
