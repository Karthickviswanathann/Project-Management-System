import {
  Component,
  Input,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popover-wrapper">

      <!-- Trigger -->
      <div (click)="togglePopover()">
        <ng-content select="[popoverTrigger]"></ng-content>
      </div>

      <!-- Content -->
      <div
        *ngIf="open"
        class="popover-content"
        [ngClass]="className"
        [ngStyle]="{
          width: width,
          top: top,
          left: left
        }"
      >
        <ng-content select="[popoverContent]"></ng-content>
      </div>

    </div>
  `,
  styles: [`
    .popover-wrapper{
      position:relative;
      display:inline-block;
    }

    .popover-content{
      position:absolute;
      z-index:999;
      margin-top:8px;
      padding:16px;
      border-radius:8px;
      border:1px solid #e5e7eb;
      background:white;
      box-shadow:
        0 10px 15px -3px rgba(0,0,0,0.1),
        0 4px 6px -4px rgba(0,0,0,0.1);

      animation:popoverFade .2s ease;
    }

    @keyframes popoverFade{
      from{
        opacity:0;
        transform:scale(.95) translateY(-5px);
      }

      to{
        opacity:1;
        transform:scale(1) translateY(0);
      }
    }
  `]
})
export class PopoverComponent {

  @Input() className = '';

  @Input() width = '18rem';

  @Input() top = '100%';

  @Input() left = '0';

  open = false;

  togglePopover() {
    this.open = !this.open;
  }

  closePopover() {
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {

    const target = event.target as HTMLElement;

    if (!target.closest('.popover-wrapper')) {
      this.closePopover();
    }
  }
}