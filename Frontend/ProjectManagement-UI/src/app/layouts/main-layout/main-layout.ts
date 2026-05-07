import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from '../../Core/services/auth.service';
import { SidebarService } from '../../Core/services/sidebar.service';
import { SidebarComponent } from '../../pages/sidebar';
import { Role } from '../../shared/mockData/types';
import {ButtonComponent} from "../../ui-elements/button";
import {InputComponent} from "../../ui-elements/input";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})


export class MainLayout implements OnInit {

   ngOnInit(): void {
    console.log('MainLayout initialized. Current user:', this.authService.user);

    this.switchRole('admin' as Role);  
  
  }


  constructor(
    public authService: AuthService,
    public sidebarService: SidebarService,
    private router: Router
  ) {
    console.log('AuthService user:', authService.user);

  }


  get user() {
  return this.authService.user;
 }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);



  }

  switchRole(role: Role): void {

    this.authService.switchRole(role);

  }

}

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
