import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  Renderer2
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resizable-panel-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="panel-group"
      [class.vertical]="direction === 'vertical'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .panel-group{
      display:flex;
      width:100%;
      height:100%;
      overflow:hidden;
    }

    .panel-group.vertical{
      flex-direction:column;
    }
  `]
})
export class ResizablePanelGroupComponent {

  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
}

@Component({
  selector: 'app-resizable-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="resizable-panel"
      [style.flex]="flex"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .resizable-panel{
      overflow:auto;
      min-width:0;
      min-height:0;
    }
  `]
})
export class ResizablePanelComponent {

  @Input() flex = '1';
}

@Component({
  selector: 'app-resizable-handle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="resize-handle"
      [class.vertical]="vertical"
      (mousedown)="startResize($event)"
    >
      <div
        *ngIf="withHandle"
        class="handle-icon"
      >
        ⋮
      </div>
    </div>
  `,
  styles: [`
    .resize-handle{
      width:4px;
      background:#e5e7eb;
      cursor:col-resize;
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .resize-handle.vertical{
      width:100%;
      height:4px;
      cursor:row-resize;
    }

    .handle-icon{
      width:14px;
      height:24px;
      border-radius:4px;
      background:white;
      border:1px solid #d1d5db;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:12px;
      z-index:10;
    }
  `]
})
export class ResizableHandleComponent {

  @Input() withHandle = false;

  @Input() vertical = false;

  private startX = 0;
  private startY = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  startResize(event: MouseEvent) {

    event.preventDefault();

    const previous =
      this.el.nativeElement.previousElementSibling;

    const next =
      this.el.nativeElement.nextElementSibling;

    if (!previous || !next) return;

    this.startX = event.clientX;
    this.startY = event.clientY;

    const prevRect = previous.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();

    const mouseMove = (moveEvent: MouseEvent) => {

      if (this.vertical) {

        const dy = moveEvent.clientY - this.startY;

        previous.style.flex = `0 0 ${prevRect.height + dy}px`;
        next.style.flex = `0 0 ${nextRect.height - dy}px`;

      } else {

        const dx = moveEvent.clientX - this.startX;

        previous.style.flex = `0 0 ${prevRect.width + dx}px`;
        next.style.flex = `0 0 ${nextRect.width - dx}px`;
      }
    };

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }
}