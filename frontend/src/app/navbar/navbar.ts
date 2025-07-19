import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
})
export class Navbar {
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.userSubject.next(null); // Reset user observable
      window.alert("Logout Successful ")
      this.router.navigate(['/login']); 
    }
  }
}
