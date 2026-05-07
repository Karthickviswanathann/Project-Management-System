import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  imports:[CommonModule],

  template: `

  <div class="collapsible">

    <!-- Trigger -->
    <div
      class="collapsible-trigger"
      (click)="toggle()">

      <span>
        {{title}}
      </span>

      <span
        class="icon"
        [class.open]="isOpen">

        ▼

      </span>

    </div>


    <!-- Content -->
    <div
      class="collapsible-content"
      [class.open]="isOpen">

      <ng-content></ng-content>

    </div>

  </div>

  `,

  styles:[`

  .collapsible{

    width:100%;

    border:1px solid #e5e7eb;

    border-radius:10px;

    overflow:hidden;

    background:white;

  }


  .collapsible-trigger{

    display:flex;

    align-items:center;

    justify-content:space-between;

    padding:14px 16px;

    cursor:pointer;

    font-weight:500;

    background:#f9fafb;

    transition:.2s;

  }

  .collapsible-trigger:hover{

    background:#f3f4f6;

  }


  .icon{

    transition:.25s;

    font-size:12px;

  }

  .icon.open{

    transform:rotate(180deg);

  }


  .collapsible-content{

    max-height:0;

    overflow:hidden;

    transition:max-height .3s ease;

    padding:0 16px;

  }

  .collapsible-content.open{

    max-height:500px;

    padding:16px;

  }

  `]
})

export class CollapsibleComponent {

  @Input()
  title = 'Collapsible';

  @Input()
  defaultOpen = false;


  isOpen = false;


  ngOnInit(){

    this.isOpen =
      this.defaultOpen;

  }


  toggle(){

    this.isOpen =
      !this.isOpen;

  }

}