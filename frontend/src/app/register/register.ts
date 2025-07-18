import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.html',
    styleUrls: ['./register.css'],
  })
  
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(event: Event) {
    event.preventDefault();
    this.authService
      .register({
        fullname: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.error = '';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error?.error || 'Registration failed.';
          this.message = '';
        },
      });
  }
}
