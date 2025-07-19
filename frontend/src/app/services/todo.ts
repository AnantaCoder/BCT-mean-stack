import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth'; 

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todo';

  constructor(
    private http: HttpClient,
    private auth: AuthService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken(); 
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(this.apiUrl, todo, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateTodo(id: string, todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, todo, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Backend error:', error);
    const message = error?.error?.error || 'Something went wrong';
    return throwError(() => new Error(message));
  }
}
