import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../model/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log(response);
        if (response.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
        }
        if (response.user) {
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}
