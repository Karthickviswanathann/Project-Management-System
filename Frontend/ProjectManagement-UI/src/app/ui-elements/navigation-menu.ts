import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navigation-menu" [ngClass]="className">
      <ng-content></ng-content>
    </nav>
  `,
  styles: [`
    .navigation-menu{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
    }
  `]
})
export class NavigationMenuComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-navigation-menu-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="navigation-menu-list" [ngClass]="className">
      <ng-content></ng-content>
    </ul>
  `,
  styles: [`
    .navigation-menu-list{
      display:flex;
      align-items:center;
      gap:4px;
      list-style:none;
      padding:0;
      margin:0;
    }
  `]
})
export class NavigationMenuListComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-navigation-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="navigation-menu-item">
      <ng-content></ng-content>
    </li>
  `,
  styles: [`
    .navigation-menu-item{
      position:relative;
    }
  `]
})
export class NavigationMenuItemComponent {}

@Component({
  selector: 'app-navigation-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="navigation-menu-trigger"
      [ngClass]="className"
      (click)="toggle()"
    >
      <ng-content></ng-content>

      <span class="icon" [class.rotate]="open">
        ▼
      </span>
    </button>

    <div class="menu-content" *ngIf="open">
      <ng-content select="app-navigation-menu-content"></ng-content>
    </div>
  `,
  styles: [`
    :host{
      position:relative;
    }

    .navigation-menu-trigger{
      display:flex;
      align-items:center;
      gap:6px;
      height:36px;
      padding:0 16px;
      border:none;
      border-radius:6px;
      background:white;
      cursor:pointer;
      font-size:14px;
      font-weight:500;
      transition:0.2s;
    }

    .navigation-menu-trigger:hover{
      background:#f3f4f6;
    }

    .icon{
      font-size:10px;
      transition:0.3s;
    }

    .icon.rotate{
      transform:rotate(180deg);
    }

    .menu-content{
      position:absolute;
      top:42px;
      left:0;
      min-width:220px;
      background:white;
      border:1px solid #e5e7eb;
      border-radius:8px;
      box-shadow:0 10px 15px rgba(0,0,0,0.1);
      padding:8px;
      z-index:1000;
    }
  `]
})
export class NavigationMenuTriggerComponent {
  @Input() className = '';
  open = false;

  toggle() {
    this.open = !this.open;
  }
}

@Component({
  selector: 'app-navigation-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navigation-menu-content" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .navigation-menu-content{
      display:flex;
      flex-direction:column;
      gap:4px;
    }
  `]
})
export class NavigationMenuContentComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-navigation-menu-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="href"
      class="navigation-menu-link"
      [ngClass]="className"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    .navigation-menu-link{
      display:block;
      padding:10px 12px;
      border-radius:6px;
      text-decoration:none;
      color:#111827;
      font-size:14px;
      transition:0.2s;
    }

    .navigation-menu-link:hover{
      background:#f3f4f6;
    }
  `]
})
export class NavigationMenuLinkComponent {
  @Input() href = '#';
  @Input() className = '';
}

@Component({
  selector: 'app-navigation-menu-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navigation-menu-indicator"></div>
  `,
  styles: [`
    .navigation-menu-indicator{
      width:10px;
      height:10px;
      background:#e5e7eb;
      transform:rotate(45deg);
      margin:auto;
    }
  `]
})
export class NavigationMenuIndicatorComponent {}

@Component({
  selector: 'app-navigation-menu-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navigation-menu-viewport">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .navigation-menu-viewport{
      position:relative;
      overflow:hidden;
    }
  `]
})
export class NavigationMenuViewportComponent {}