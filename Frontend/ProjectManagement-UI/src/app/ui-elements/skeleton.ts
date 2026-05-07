import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      [ngClass]="computedClass"
      [ngStyle]="style"
    ></div>
  `,
  styles: [`
    .skeleton {
      animation: pulse 1.5s ease-in-out infinite;
      border-radius: 6px;
      background-color: rgba(59, 130, 246, 0.1); /* similar to primary/10 */
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
  `]
})
export class SkeletonComponent {

  @Input() class = '';
  @Input() width?: string;
  @Input() height?: string;

  get computedClass() {
    return `skeleton ${this.class}`;
  }

  get style() {
    return {
      width: this.width || '100%',
      height: this.height || '16px'
    };
  }
}