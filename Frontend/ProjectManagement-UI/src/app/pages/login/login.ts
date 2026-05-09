import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
roles = [
  {
    role: 'admin',
    label: 'Admin / Delivery Manager',
    email: 'sarah.chen@company.com',
    icon: 'fa-user-shield'
  },
  {
    role: 'tl',
    label: 'Team Lead / Coordinator',
    email: 'marcus.reed@company.com',
    icon: 'fa-users'
  },
  {
    role: 'developer',
    label: 'Developer',
    email: 'priya.patel@company.com',
    icon: 'fa-code'
  },
  {
    role: 'tester',
    label: 'Tester / QA',
    email: 'jordan.kim@company.com',
    icon: 'fa-bug'
  }
];
  selected='admin';
  email=this.roles[0].email;
  password='demo1234';

  constructor(private router:Router){}

  selectRole(role:any){

    this.selected=role.role;

    this.email=role.email;
  }

  login(){

    localStorage.setItem('role',this.selected);

    this.router.navigate(['/dashboard']);
  }


}
