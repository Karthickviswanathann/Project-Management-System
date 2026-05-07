import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="progress-root"
      [ngClass]="className"
    >
      <div
        class="progress-indicator"
        [style.width.%]="value"
      ></div>
    </div>
  `,
  styles: [`
    .progress-root{
      position: relative;
      height: 8px;
      width: 100%;
      overflow: hidden;
      border-radius: 9999px;
      background: rgba(59,130,246,0.2);
    }

    .progress-indicator{
      height: 100%;
      background: #3b82f6;
      transition: width .3s ease;
      border-radius: inherit;
    }
  `]
})
export class ProgressComponent {

  @Input() value: number = 0;

  @Input() className: string = '';
}