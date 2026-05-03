import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',

  template: `
  
    <div class="stat-card">

      <div class="card-content">

        <div>

          <p class="card-label">
            {{label}}
          </p>

          <p class="card-value">
            {{value}}
          </p>

          <p
            *ngIf="trend"
            class="card-trend"
            [class.positive]="trendPositive"
            [class.negative]="!trendPositive">

            {{trend}}

          </p>

        </div>


        <div
          class="icon-container"
          [ngClass]="accent">

          <i-lucide
            [name]="icon">
          </i-lucide>

        </div>

      </div>

    </div>

  `,


  styles: [`

    .stat-card{
      border:1px solid #e5e7eb;
      border-radius:12px;
      padding:20px;
      background:white;
      transition:.3s;
    }

    .stat-card:hover{
      box-shadow:0 8px 20px rgba(0,0,0,.08);
    }

    .card-content{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
    }

    .card-label{
      font-size:14px;
      color:#6b7280;
      margin:0;
    }

    .card-value{
      font-size:32px;
      font-weight:600;
      margin-top:8px;
    }

    .card-trend{
      margin-top:6px;
      font-size:12px;
      font-weight:500;
    }

    .positive{
      color:green;
    }

    .negative{
      color:red;
    }

    .icon-container{
      width:40px;
      height:40px;
      border-radius:10px;

      display:flex;
      align-items:center;
      justify-content:center;
    }

    .primary{
      background:#eff6ff;
      color:#2563eb;
    }

    .success{
      background:#f0fdf4;
      color:#16a34a;
    }

    .warning{
      background:#fffbeb;
      color:#d97706;
    }

    .destructive{
      background:#fef2f2;
      color:#dc2626;
    }

  `]

})
export class StatCardComponent {

  @Input() label!: string;

  @Input() value!: string | number;

  @Input() icon!: string;

  @Input() trend?: string;

  @Input() trendPositive = false;

  @Input() accent = 'primary';

}