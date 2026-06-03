import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.base}/login`, data, { responseType: 'text' });
  }

  register(data: any) {
    return this.http.post(`${this.base}/register`, data, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}