import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'authToken';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      this.userSubject.next(decoded);
    }
  }

  register(userData: any) {
    const { fullname, email, password } = userData;
    return this.http.post(`${this.apiUrl}/register`, { fullname, email, password });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
        const decodedUser = this.decodeToken(response.token);
        this.userSubject.next(decodedUser);
      })
    );
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

 
}
