import { Component,OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone:true,
  imports:[CommonModule]
})
export class Profile implements OnInit{
  user:any= {}
  ngOnInit(): void {
      const storedUser = localStorage.getItem('user')
      if (storedUser){
        this.user = JSON.parse(storedUser)
        console.log("user info loaded")
      }
  }
}
