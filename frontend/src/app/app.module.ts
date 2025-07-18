import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Profile } from './profile/profile';
import { Todolist } from './todolist/todolist';
import { Home } from './home/home';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { FooterComponent } from './footer/footer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    App,
    Navbar,
    Profile,
    Todolist,
    Home,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
  ],
})
export class AppModule {}
