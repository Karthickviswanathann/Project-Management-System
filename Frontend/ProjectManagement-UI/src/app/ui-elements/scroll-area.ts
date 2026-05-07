import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="scroll-area"
      [ngClass]="className"
      [style.height]="height"
      [style.width]="width"
    >
      <div class="scroll-viewport">

        <ng-content></ng-content>

      </div>
    </div>
  `,
  styles: [`
    .scroll-area{
      position: relative;
      overflow: hidden;
      border-radius: inherit;
    }

    .scroll-viewport{
      width:100%;
      height:100%;
      overflow:auto;

      scrollbar-width: thin;
      scrollbar-color: #d1d5db transparent;
    }

    /* Chrome / Edge / Safari */

    .scroll-viewport::-webkit-scrollbar{
      width:10px;
      height:10px;
    }

    .scroll-viewport::-webkit-scrollbar-track{
      background:transparent;
    }

    .scroll-viewport::-webkit-scrollbar-thumb{
      background:#d1d5db;
      border-radius:9999px;
      border:2px solid transparent;
      background-clip:content-box;
    }

    .scroll-viewport::-webkit-scrollbar-thumb:hover{
      background:#9ca3af;
      background-clip:content-box;
    }
  `]
})
export class ScrollAreaComponent {

  @Input() className = '';

  @Input() height = '300px';

  @Input() width = '100%';
}