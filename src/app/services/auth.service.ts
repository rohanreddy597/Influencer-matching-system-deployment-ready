import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = window.location.origin; // Backend API base URL - auto-detects localhost or production

  constructor(private http: HttpClient) {}

  // Login with Google OAuth
  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}/login`; // Redirects to Google OAuth
  }

  // Brand login
  brandLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/brand/login`, { username, password });
  }

  // Brand signup
  brandSignup(username: string, password: string, brandName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/brand/signup`, { username, password, brandName });
  }
}

