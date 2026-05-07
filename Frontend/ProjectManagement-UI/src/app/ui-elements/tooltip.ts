import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

type Side = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="tooltip-wrapper" (mouseenter)="show()" (mouseleave)="hide()">

  <!-- Trigger -->
  <ng-content select="[tooltipTrigger]"></ng-content>

  <!-- Tooltip Content -->
  <div
    class="tooltip"
    *ngIf="visible"
    [ngClass]="side"
  >
    <ng-content select="[tooltipContent]"></ng-content>
  </div>

</div>
  `,
  styles: [`

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* TOOLTIP BOX (Radix Content equivalent) */
.tooltip {
  position: absolute;
  z-index: 9999;

  background: #111827;
  color: white;

  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;

  white-space: nowrap;

  animation: fadeIn 0.15s ease, zoomIn 0.15s ease;
}

/* ================= SIDES ================= */

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -6px);
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 6px);
}

.tooltip.left {
  right: 100%;
  top: 50%;
  transform: translate(-6px, -50%);
}

.tooltip.right {
  left: 100%;
  top: 50%;
  transform: translate(6px, -50%);
}

/* ================= ANIMATION (Radix style) ================= */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
  `]
})
export class TooltipComponent {

  @Input() side: Side = 'top';

  visible = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}