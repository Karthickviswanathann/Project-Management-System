import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',

  template: `

    <span
      class="badge"
      [ngClass]="getBadgeClass()">

      {{ getLabel() }}

    </span>

  `,

  styles: [`

    .badge{

      display:inline-flex;

      align-items:center;

      padding:2px 8px;

      border-radius:6px;

      border:1px solid;

      font-size:12px;

      font-weight:500;

      text-transform:capitalize;

    }


    /* priority */

    .high{
      background:#fef2f2;
      color:#dc2626;
      border-color:#fecaca;
    }

    .medium{
      background:#fffbeb;
      color:#d97706;
      border-color:#fde68a;
    }

    .low{
      background:#f0fdf4;
      color:#16a34a;
      border-color:#bbf7d0;
    }


    /* project */

    .planning{
      background:#f3f4f6;
      color:#6b7280;
      border-color:#d1d5db;
    }

    .active{
      background:#eff6ff;
      color:#2563eb;
      border-color:#bfdbfe;
    }

    .on-hold{
      background:#fffbeb;
      color:#d97706;
      border-color:#fde68a;
    }

    .completed{
      background:#f0fdf4;
      color:#16a34a;
      border-color:#bbf7d0;
    }


    /* task */

    .todo{
      background:#f3f4f6;
      color:#6b7280;
      border-color:#d1d5db;
    }

    .in-progress{
      background:#eff6ff;
      color:#2563eb;
      border-color:#bfdbfe;
    }

    .review{
      background:#f5f3ff;
      color:#7c3aed;
      border-color:#ddd6fe;
    }

    .done{
      background:#f0fdf4;
      color:#16a34a;
      border-color:#bbf7d0;
    }


    /* test */

    .pending{
      background:#fffbeb;
      color:#d97706;
      border-color:#fde68a;
    }

    .passed{
      background:#f0fdf4;
      color:#16a34a;
      border-color:#bbf7d0;
    }

    .failed{
      background:#fef2f2;
      color:#dc2626;
      border-color:#fecaca;
    }

  `]

})
export class StatusBadgeComponent {

  @Input() type!: string;

  @Input() value!: string;


  getBadgeClass(): string {

    return this.value;

  }


  getLabel(): string {

    return this.value.replace('-', ' ');

  }

}