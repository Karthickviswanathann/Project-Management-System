import {
  Component,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { SidebarService } from '../Core/services/sidebar.service';
import { DeviceService } from '../Core/services/responsive';
import { AuthService } from '../Core/services/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `<div
  class="sidebar"
  [class.collapsed]="!sidebarService.isOpen"
>

  <!-- HEADER -->

  <div class="sidebar-header">

    <div class="logo">

     <button class="material-icons" >auto_awesome</button> <span>Allocate</span>
      
    </div>

   

  </div>


  <!-- MENU -->

  <div class="menu">

    <a
      *ngFor="let item of menuItems"
      [routerLink]="item.route"
      routerLinkActive="active"
      class="menu-item"

    >

    <span class="material-icons icon">
      {{ item.icon }}
    </span>

       <span class="label">
      {{ item.label }}
    </span>

    </a>

  </div>

</div>`,
  styles: [`
  .sidebar{

  width:260px;
  height:100vh;

  background:#eef2ff;
  color:#1e293b;

  position:fixed;
  left:0;
  top:0;

  transition:.3s ease;

  overflow:hidden;

  z-index:100;
}


/* COLLAPSED */

.sidebar.collapsed{
  width:70px;
}


/* HEADER */

.sidebar-header{

  height:64px;

  display:flex;
  align-items:center;
  justify-content:space-between;

  padding:0 16px;

  border-bottom:1px solid rgba(255,255,255,.08);
}


/* LOGO */

.logo{
  font-size:20px;
  font-weight:700;
  white-space:nowrap;
}


/* BUTTON */

.toggle-btn{

  width:36px;
  height:36px;

  border:none;
  border-radius:8px;

  background:transparent;
  color:white;

  cursor:pointer;

  font-size:18px;
}


/* MENU */

.menu{

  display:flex;
  flex-direction:column;

  padding:14px;
}


/* LINKS */

.menu a{

  height:46px;

  display:flex;
  align-items:center;

  padding:0 14px;

  border-radius:10px;
  color:black;
  text-decoration:none;

  font-size:15px;
  font-weight:500;

  transition:.2s;

  margin-bottom:6px;
}


.menu a:hover,
.menu a.active{

  background:#1e293b;
  color:white;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
}

.menu-item .icon {
  font-size: 20px;
} 

/* COLLAPSED MENU */

.sidebar.collapsed .menu a{

  justify-content:center;
  padding:0;
}


.material-icons{
   background-color: white;
    padding: 5px;
    border-radius: 10px;
}

.material-icons > span{
padding-bottom: 10px;
}

/* MOBILE */

@media(max-width:768px){

  .sidebar{
    transform:translateX(-100%);
  }

  .sidebar:not(.collapsed){
    transform:translateX(0);
  }

}  
  `]
})

export class SidebarComponent {

 constructor(
    public sidebarService: SidebarService,
    public deviceService: DeviceService,
    public authService: AuthService
  ) {}

  navItems = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'dashboard',
    roles: ['admin', 'tl', 'developer', 'tester']
  },
  {
    label: 'Projects',
    route: '/projects',
    icon: 'folder',
    roles: ['admin', 'tl']
  },
  {
    label: 'Allocation',
    route: '/allocation',
    icon: 'assignment',
    roles: ['admin', 'tl']
  },
  {
    label: 'Resources',
    route: '/resources',
    icon: 'people',
    roles: ['admin', 'tl']
  },
  {
    label: 'Tasks',
    route: '/tasks',
    icon: 'task',
    roles: ['admin', 'tl', 'developer', 'tester']
  }
];

  get menuItems(){

    const role = this.authService.user?.role;

    return this.navItems.filter(
      x => role && x.roles.includes(role)
    );

  }

  toggleSidebar(){

    this.sidebarService.toggle();

  }

  @HostListener('window:keydown', ['$event'])
  keyboardShortcut(event: KeyboardEvent){

    if(event.ctrlKey && event.key.toLowerCase() === 'b'){

      event.preventDefault();

      this.toggleSidebar();

    }

  }

}