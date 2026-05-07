import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-command',
  standalone: true,

  imports:[
    CommonModule,
    FormsModule
  ],

  template: `

  <!-- Overlay -->
  <div
    class="command-overlay"
    *ngIf="open"
    (click)="closeCommand()">

    <!-- Dialog -->
    <div
      class="command-dialog"
      (click)="$event.stopPropagation()">

      <!-- Search -->
      <div class="command-input-wrapper">

        <span class="search-icon">
          🔍
        </span>

        <input
          type="text"
          [(ngModel)]="search"
          placeholder="Search command..."
          class="command-input"
        />

      </div>


      <!-- Empty -->
      <div
        class="command-empty"
        *ngIf="filteredItems.length === 0">

        No results found.

      </div>


      <!-- List -->
      <div class="command-list">

        <div
          class="command-item"
          *ngFor="let item of filteredItems"
          (click)="selectItem(item)">

          <span>

            {{item.label}}

          </span>

          <span class="shortcut">

            {{item.shortcut}}

          </span>

        </div>

      </div>

    </div>

  </div>

  `,

  styles:[`

  .command-overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.5);

    display:flex;

    align-items:center;

    justify-content:center;

    z-index:1000;

  }


  .command-dialog{

    width:600px;

    max-width:90%;

    background:white;

    border-radius:16px;

    overflow:hidden;

    box-shadow:0 10px 40px rgba(0,0,0,.2);

  }


  .command-input-wrapper{

    display:flex;

    align-items:center;

    border-bottom:1px solid #e5e7eb;

    padding:0 16px;

  }


  .search-icon{

    margin-right:10px;

    color:#9ca3af;

  }


  .command-input{

    width:100%;

    height:55px;

    border:none;

    outline:none;

    font-size:15px;

  }


  .command-list{

    max-height:300px;

    overflow:auto;

    padding:8px;

  }


  .command-item{

    display:flex;

    align-items:center;

    justify-content:space-between;

    padding:12px;

    border-radius:10px;

    cursor:pointer;

    transition:.2s;

  }

  .command-item:hover{

    background:#f3f4f6;

  }


  .shortcut{

    font-size:12px;

    color:#9ca3af;

  }


  .command-empty{

    padding:30px;

    text-align:center;

    color:#6b7280;

  }

  `]
})

export class CommandComponent {

  @Input()
  open = false;


  @Input()
  items:any[] = [

    {
      label:'Dashboard',
      shortcut:'⌘D'
    },

    {
      label:'Projects',
      shortcut:'⌘P'
    }

  ];


  @Output()
  openChange =
    new EventEmitter<boolean>();


  @Output()
  itemSelected =
    new EventEmitter<any>();


  search = '';


  get filteredItems(){

    return this.items.filter(x =>

      x.label
      .toLowerCase()
      .includes(
        this.search.toLowerCase()
      )

    );

  }


  closeCommand(){

    this.open = false;

    this.openChange.emit(false);

  }


  selectItem(item:any){

    this.itemSelected.emit(item);

    this.closeCommand();

  }

}