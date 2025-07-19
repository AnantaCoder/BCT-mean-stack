import { Component,OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone:true,
  imports:[CommonModule]
})
// my previous code ----------------------------------------------
// export class Profile implements OnInit{
//   user:any= {}
//   ngOnInit(): void {
//       const storedUser = localStorage.getItem('user')
//       if (storedUser){
//         this.user = JSON.parse(storedUser)
//         console.log("user info loaded")
//       }
//   }
// }


//---------------------------------------------------------------

//sirs code 

export class Profile implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log("User loaded from AuthService", this.user);
  }
  logout(){
    this.authService.logout()
  }
}