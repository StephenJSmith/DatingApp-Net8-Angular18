import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'client';
  users: any;

  ngOnInit(): void {
    const url = "https://localhost:5001/api/users";
    this.http
      .get(url)
      .subscribe({
        next: (response) => this.users = response,
        error: error => console.error(error),
        complete: () => console.log(this.users),
      });
  }
}
