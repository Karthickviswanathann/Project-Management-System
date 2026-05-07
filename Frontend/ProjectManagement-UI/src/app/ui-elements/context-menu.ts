import {
  Component,
  HostListener,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],

  template: `

<div
  class="context-wrapper"
  (contextmenu)="openMenu($event)"
>

  <!-- Content -->
  <ng-content></ng-content>


  <!-- Overlay -->
  <div
    *ngIf="menuOpen"
    class="overlay"
    (click)="closeMenu()"
  ></div>


  <!-- Menu -->
  <div
    *ngIf="menuOpen"
    class="context-menu"
    [style.left.px]="menuX"
    [style.top.px]="menuY"
  >

    <!-- Label -->
    <div
      *ngIf="label"
      class="menu-label"
    >
      {{ label }}
    </div>


    <!-- Menu Items -->
    <div
      *ngFor="let item of items"
      class="menu-item"
      [class.disabled]="item.disabled"
      (click)="selectItem(item)"
    >

      <!-- Checkbox -->
      <span
        *ngIf="item.type === 'checkbox'"
        class="icon"
      >
        {{ item.checked ? '✔' : '' }}
      </span>

      <!-- Radio -->
      <span
        *ngIf="item.type === 'radio'"
        class="icon"
      >
        {{ item.checked ? '●' : '○' }}
      </span>

      <!-- Normal -->
      <span
        *ngIf="!item.type"
        class="icon"
      >
      </span>

      <!-- Label -->
      <span class="text">
        {{ item.label }}
      </span>

      <!-- Shortcut -->
      <span
        *ngIf="item.shortcut"
        class="shortcut"
      >
        {{ item.shortcut }}
      </span>

    </div>


    <!-- Separator -->
    <div
      *ngIf="showSeparator"
      class="separator"
    ></div>

  </div>

</div>

  `,

  styles: [`

.context-wrapper{

  position:relative;
  display:block;
}


.overlay{

  position:fixed;
  inset:0;
  z-index:998;
}


.context-menu{

  position:fixed;

  min-width:220px;

  background:#fff;

  border:1px solid #e2e8f0;

  border-radius:10px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.15);

  padding:6px;

  z-index:999;

  animation:fadeIn .15s ease;
}


.menu-label{

  padding:10px 12px;

  font-size:13px;

  font-weight:600;

  color:#111827;
}


.menu-item{

  display:flex;

  align-items:center;

  gap:10px;

  padding:10px 12px;

  border-radius:8px;

  cursor:pointer;

  transition:.2s;

  font-size:14px;

  color:#111827;
}


.menu-item:hover{

  background:#f1f5f9;
}


.menu-item.disabled{

  opacity:.5;

  pointer-events:none;
}


.icon{

  width:16px;

  display:flex;

  justify-content:center;
}


.text{

  flex:1;
}


.shortcut{

  font-size:12px;

  color:#64748b;
}


.separator{

  height:1px;

  background:#e2e8f0;

  margin:6px 0;
}


@keyframes fadeIn{

  from{

    opacity:0;
    transform:scale(.95);

  }

  to{

    opacity:1;
    transform:scale(1);

  }

}

  `]
})

export class ContextMenuComponent {

  @Input() label = '';

  @Input() showSeparator = false;

  @Input() items: any[] = [];


  menuOpen = false;

  menuX = 0;

  menuY = 0;


  openMenu(event: MouseEvent) {

    event.preventDefault();

    this.menuX = event.clientX;

    this.menuY = event.clientY;

    this.menuOpen = true;
  }


  closeMenu() {

    this.menuOpen = false;
  }


  selectItem(item: any) {

    if (item.disabled) return;

    if (item.action) {

      item.action();
    }

    this.closeMenu();
  }


  @HostListener('document:keydown.escape')
  onEscape() {

    this.closeMenu();
  }

}