import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],

  template: `

<div class="dropdown-container">

  <!-- Trigger -->
  <button
    class="dropdown-trigger"
    (click)="toggleDropdown()"
  >

    {{ triggerLabel }}

    <span class="arrow">
      ▼
    </span>

  </button>


  <!-- Dropdown Menu -->
  <div
    class="dropdown-content"
    *ngIf="isOpen"
  >

    <!-- Label -->
    <div
      *ngIf="label"
      class="dropdown-label"
    >
      {{ label }}
    </div>


    <!-- Separator -->
    <div
      *ngIf="label"
      class="dropdown-separator"
    ></div>


    <!-- Menu Items -->
    <div
      *ngFor="let item of items"
      class="dropdown-item"
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
      <span class="item-text">
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

  </div>

</div>

  `,

  styles: [`

.dropdown-container{

  position:relative;

  display:inline-block;
}


.dropdown-trigger{

  display:flex;

  align-items:center;

  gap:8px;

  padding:10px 16px;

  border:none;

  border-radius:8px;

  background:#2563eb;

  color:white;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}


.dropdown-trigger:hover{

  background:#1d4ed8;
}


.arrow{

  font-size:11px;
}


.dropdown-content{

  position:absolute;

  top:110%;

  left:0;

  min-width:220px;

  background:white;

  border:1px solid #e2e8f0;

  border-radius:10px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.12);

  padding:6px;

  z-index:1000;

  animation:fadeIn .15s ease;
}


.dropdown-label{

  padding:8px 10px;

  font-size:13px;

  font-weight:600;

  color:#111827;
}


.dropdown-separator{

  height:1px;

  background:#e2e8f0;

  margin:4px 0;
}


.dropdown-item{

  display:flex;

  align-items:center;

  gap:10px;

  padding:10px;

  border-radius:8px;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}


.dropdown-item:hover{

  background:#f1f5f9;
}


.dropdown-item.disabled{

  opacity:.5;

  pointer-events:none;
}


.icon{

  width:18px;

  text-align:center;
}


.item-text{

  flex:1;
}


.shortcut{

  font-size:12px;

  color:#64748b;
}


@keyframes fadeIn{

  from{

    opacity:0;

    transform:translateY(-5px);
  }

  to{

    opacity:1;

    transform:translateY(0);
  }

}

  `]
})

export class DropdownMenuComponent {

  @Input() triggerLabel = 'Open Menu';

  @Input() label = 'Menu';


  @Input() items: any[] = [

    {
      label: 'Profile',
      shortcut: '⌘P'
    },

    {
      label: 'Settings',
      shortcut: '⌘S'
    },

    {
      label: 'Dark Mode',
      type: 'checkbox',
      checked: true
    },

    {
      label: 'Logout'
    }

  ];


  @Output() itemSelected =
    new EventEmitter<any>();


  isOpen = false;


  toggleDropdown(){

    this.isOpen = !this.isOpen;
  }


  closeDropdown(){

    this.isOpen = false;
  }


  selectItem(item: any){

    if(item.disabled) return;

    if(item.type === 'checkbox'){

      item.checked = !item.checked;
    }

    if(item.type === 'radio'){

      this.items.forEach(x => {

        if(x.type === 'radio'){

          x.checked = false;
        }
      });

      item.checked = true;
    }

    this.itemSelected.emit(item);

    this.closeDropdown();
  }


  @HostListener('document:click', ['$event'])
  onOutsideClick(event: any){

    if(!event.target.closest('.dropdown-container')){

      this.closeDropdown();
    }
  }

}