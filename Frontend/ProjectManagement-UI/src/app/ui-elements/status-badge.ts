import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

type BadgeType = 'priority' | 'project' | 'task' | 'test';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<span class="badge" [ngClass]="computedClass">
  {{ label }}
</span>
  `,
  styles: [`
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid transparent;
  text-transform: capitalize;
}

/* PRIORITY */
.priority-high {
  background: rgba(239,68,68,0.1);
  color: #ef4444;
  border-color: rgba(239,68,68,0.2);
}

.priority-medium {
  background: rgba(245,158,11,0.15);
  color: #b45309;
  border-color: rgba(245,158,11,0.3);
}

.priority-low {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-color: rgba(34,197,94,0.2);
}

/* PROJECT */
.project-planning {
  background: #f3f4f6;
  color: #6b7280;
  border-color: #e5e7eb;
}

.project-active {
  background: rgba(59,130,246,0.1);
  color: #3b82f6;
  border-color: rgba(59,130,246,0.2);
}

.project-on-hold {
  background: rgba(245,158,11,0.15);
  color: #b45309;
  border-color: rgba(245,158,11,0.3);
}

.project-completed {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-color: rgba(34,197,94,0.2);
}

/* TASK */
.task-todo {
  background: #f3f4f6;
  color: #6b7280;
  border-color: #e5e7eb;
}

.task-in-progress {
  background: rgba(59,130,246,0.1);
  color: #3b82f6;
  border-color: rgba(59,130,246,0.2);
}

.task-review {
  background: rgba(99,102,241,0.15);
  color: #4f46e5;
  border-color: #6366f1;
}

.task-done {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-color: rgba(34,197,94,0.2);
}

/* TEST */
.test-pending {
  background: rgba(245,158,11,0.15);
  color: #b45309;
  border-color: rgba(245,158,11,0.3);
}

.test-passed {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-color: rgba(34,197,94,0.2);
}

.test-failed {
  background: rgba(239,68,68,0.1);
  color: #ef4444;
  border-color: rgba(239,68,68,0.2);
}
  `]
})
export class StatusBadgeComponent {

  @Input() type: BadgeType = 'task';
  @Input() value: string = '';

  get label(): string {
    return this.value?.replace('-', ' ');
  }

  get computedClass(): string {
    const key = `${this.type}-${this.value}`;
    return key;
  }
}