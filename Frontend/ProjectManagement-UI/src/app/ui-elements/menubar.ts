import {
  Component,
  ContentChildren,
  QueryList,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menubar" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .menubar{
      display:flex;
      align-items:center;
      gap:4px;
      padding:4px;
      height:36px;
      border:1px solid #e5e7eb;
      border-radius:6px;
      background:white;
      box-shadow:0 1px 2px rgba(0,0,0,0.08);
    }
  `]
})
export class MenubarComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-menubar-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-wrapper">
      <ng-content></ng-content>
    </div>
  `
})
export class MenubarMenuComponent {}

@Component({
  selector: 'app-menubar-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="menubar-trigger"
      [ngClass]="className"
      (click)="toggle()"
    >
      <ng-content></ng-content>
    </button>

    <div class="menubar-content" *ngIf="open">
      <ng-content select="app-menubar-content"></ng-content>
    </div>
  `,
  styles: [`
    :host{
      position:relative;
    }

    .menubar-trigger{
      border:none;
      background:transparent;
      padding:6px 12px;
      border-radius:4px;
      cursor:pointer;
      font-size:14px;
      font-weight:500;
    }

    .menubar-trigger:hover{
      background:#f3f4f6;
    }

    .menubar-content{
      position:absolute;
      top:40px;
      left:0;
      min-width:200px;
      background:white;
      border:1px solid #e5e7eb;
      border-radius:6px;
      box-shadow:0 10px 15px rgba(0,0,0,0.1);
      padding:4px;
      z-index:1000;
    }
  `]
})
export class MenubarTriggerComponent {
  @Input() className = '';
  open = false;

  toggle() {
    this.open = !this.open;
  }
}

@Component({
  selector: 'app-menubar-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class MenubarContentComponent {}

@Component({
  selector: 'app-menubar-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menubar-item" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .menubar-item{
      padding:8px 10px;
      border-radius:4px;
      cursor:pointer;
      font-size:14px;
    }

    .menubar-item:hover{
      background:#f3f4f6;
    }
  `]
})
export class MenubarItemComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-menubar-separator',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="separator"></div>`,
  styles: [`
    .separator{
      height:1px;
      background:#e5e7eb;
      margin:4px 0;
    }
  `]
})
export class MenubarSeparatorComponent {}

@Component({
  selector: 'app-menubar-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="label" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .label{
      padding:6px 10px;
      font-size:13px;
      font-weight:600;
    }
  `]
})
export class MenubarLabelComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-menubar-shortcut',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="shortcut" [ngClass]="className">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .shortcut{
      margin-left:auto;
      font-size:12px;
      opacity:0.6;
    }
  `]
})
export class MenubarShortcutComponent {
  @Input() className = '';
}