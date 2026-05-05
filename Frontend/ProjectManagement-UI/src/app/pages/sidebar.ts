import { Component, HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceService } from '../Core/services/responsive';
import { SidebarService } from '../Core/services/sidebar.service';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: `<div
  class="sidebar"
  [class.collapsed]="!sidebarService.isOpen"
  [class.mobile]="deviceService.isMobile"
>

  <!-- Trigger -->
  <button
    class="toggle-btn"
    (click)="toggleSidebar()"
  >
    ☰
  </button>


  <!-- Header -->
  <div class="sidebar-header">
    Resource Manager
  </div>


  <!-- Menu -->
  <ul class="menu">

    <li routerLink="/dashboard">
      Dashboard
    </li>

    <li routerLink="/projects">
      Projects
    </li>

    <li routerLink="/allocation">
      Allocation
    </li>

    <li routerLink="/resources">
      Resources
    </li>

    <li routerLink="/tasks">
      Tasks
    </li>

    <li routerLink="/teams">
      Teams
    </li>

  </ul>

</div>`,
  styles: [`
  
.sidebar{
  width:250px;
  height:100vh;
  background:#1f2937;
  color:white;
  transition:0.3s;
  overflow:hidden;
}

.sidebar.collapsed{
  width:70px;
}

.sidebar.mobile{
  position:fixed;
  z-index:1000;
}

.toggle-btn{
  margin:10px;
}

.sidebar-header{
  padding:20px;
  font-weight:bold;
}

.menu{
  list-style:none;
  padding:0;
}

.menu li{
  padding:15px 20px;
  cursor:pointer;
}

.menu li:hover{
  background:#374151;
}
  `]
})

export class SidebarComponent {

 constructor(
    public sidebarService: SidebarService,
    public deviceService: DeviceService
  ) { }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  @HostListener('window:keydown', ['$event'])
  keyboardShortcut(event: KeyboardEvent) {

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === 'b'
    ) {
      event.preventDefault();
      this.toggleSidebar();
    }
  }
}