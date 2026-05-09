import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="card">

  <div class="content">

    <!-- Left side -->
    <div>

      <p class="label">{{ label }}</p>

      <p class="value">{{ value }}</p>

      <p
        *ngIf="trend"
        class="trend"
        [ngClass]="trendPositive ? 'trend-positive' : 'trend-negative'"
      >
        {{ trend }}
      </p>

    </div>

    <!-- Icon -->
    <div class="icon" [ngClass]="accentClass">
     <span class="material-icons">
        {{ icon }}
      </span>

    </div>

    
  </div>

</div>
  `,
  styles: [`

    
.material-icons{ 
    font-family:'Material Icons' !important; 
}
.card {
  border: 1px solid #e5e7eb;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow-card, 0 2px 10px rgba(0,0,0,0.05));
  transition: 0.2s;
}


.card:hover {
  box-shadow: var(--shadow-elevated, 0 6px 20px rgba(0,0,0,0.12));
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* text */
.label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.value {
  font-size: 28px;
  font-weight: 500;
  margin-top: 8px;
  color: #111827;
}

/* trend */
.trend {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
}

.trend-positive {
  color: #22c55e;
}

.trend-negative {
  color: #ef4444;
}

/* icon box */
.icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* accents (same as React map) */
.primary {
  background: rgba(59,130,246,0.1);
  color: #3b82f6;
}

.success {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
}

.warning {
  background: rgba(245,158,11,0.15);
  color: #b45309;
}

.destructive {
  background: rgba(239,68,68,0.1);
  color: #ef4444;
}
  `]
})
export class StatCardComponent {

  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = ''; // Lucide icon class or font icon
  @Input() trend?: string;
  @Input() trendPositive: boolean = false;
  @Input() accent: 'primary' | 'success' | 'warning' | 'destructive' = 'primary';

  get accentClass() {
    return this.accent;
  }
}