import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault()
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          this.message = res.message
          this.error = ''
          alert('Login successful')
          console.log(this.message)
          localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
          this.router.navigate(['/home'])
        },
        error: (err) => {
          
          this.error = err.error?.error || 'Login failed.'
          this.message = ''
        },
      })
  }
  
}
