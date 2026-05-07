import {
  Component,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],

  template: `

<div
  class="badge"
  [ngClass]="variant"
>

  <ng-content></ng-content>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* BASE */

.badge{

  display:inline-flex;
  align-items:center;

  border-radius:6px;

  padding:4px 10px;

  font-size:12px;
  font-weight:600;

  line-height:1;

  border:1px solid transparent;

  transition:.2s;

  white-space:nowrap;
}


/* DEFAULT */

.badge.default{

  background:#2563eb;

  color:white;

  box-shadow:0 1px 2px rgba(0,0,0,.1);
}

.badge.default:hover{
  opacity:.9;
}


/* SECONDARY */

.badge.secondary{

  background:#e2e8f0;

  color:#0f172a;
}

.badge.secondary:hover{
  background:#cbd5e1;
}


/* DESTRUCTIVE */

.badge.destructive{

  background:#dc2626;

  color:white;
}

.badge.destructive:hover{
  opacity:.9;
}


/* OUTLINE */

.badge.outline{

  background:transparent;

  border-color:#cbd5e1;

  color:#0f172a;
}

.badge.outline:hover{
  background:#f8fafc;
}

  `]
})
export class BadgeComponent {

  @Input()
  variant:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    = 'default';

}