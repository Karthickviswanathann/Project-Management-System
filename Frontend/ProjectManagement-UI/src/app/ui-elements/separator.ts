import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="[
        orientation === 'horizontal'
          ? 'separator-horizontal'
          : 'separator-vertical',
        decorative ? 'decorative' : '',
        className
      ]"
      [attr.role]="decorative ? null : 'separator'"
      [attr.aria-orientation]="orientation"
    ></div>
  `,
  styles: [`
    .separator-horizontal{
      width:100%;
      height:1px;
      background:#e5e7eb;
      flex-shrink:0;
    }

    .separator-vertical{
      width:1px;
      height:100%;
      background:#e5e7eb;
      flex-shrink:0;
    }
  `]
})
export class SeparatorComponent {

  @Input()
  orientation: 'horizontal' | 'vertical'
    = 'horizontal';

  @Input()
  decorative = true;

  @Input()
  className = '';
}