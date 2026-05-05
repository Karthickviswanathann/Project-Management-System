import { Component } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

mobileOpen = false;

  navItems = [

    {
      label:'Dashboard',
      route:'/dashboard',
      roles:['admin','tl','developer','tester']
    },

    {
      label:'Projects',
      route:'/projects',
      roles:['admin','tl','developer','tester']
    },

    {
      label:'Allocation',
      route:'/allocation',
      roles:['admin','tl']
    },

    {
      label:'Teams',
      route:'/teams',
      roles:['admin','tl']
    },

    {
      label:'Resources',
      route:'/resources',
      roles:['admin','tl']
    },

    {
      label:'Tasks',
      route:'/tasks',
      roles:['admin','tl','developer','tester']
    }

  ];


  constructor(
    public authService: AuthService,
    private router: Router
  ){}


  get menuItems(){

    return this.navItems.filter(
      x => x.roles.includes(
        this.authService.user?.role
      )
    );

  }


  logout(): void {

    this.authService.logout();

    this.router.navigate(
      ['/login']
    );

  }


  switchRole(
    role:string
  ): void {

    this.authService.switchRole(
      role
    );

  }

}
