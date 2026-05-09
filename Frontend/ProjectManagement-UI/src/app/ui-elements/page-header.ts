import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="page-header">

      <div>

        <h1 class="page-title">
          {{title}}
        </h1>


        <p
          *ngIf="description"
          class="page-description">

          {{description}}

        </p>

      </div>


      <div
        *ngIf="actions"
        class="page-actions">

        {{actions}}

      </div>

    </div>

  `,


  styles: [`

    .page-header{

      margin-bottom:24px;

      display:flex;
      justify-content:space-between;
      align-items:center;

      gap:12px;

      flex-wrap:wrap;

    }


    .page-title{

      margin:0;

      font-size:22px;

      font-weight:500;

      letter-spacing:-0.5px;

      color:#111827;

    }


    .page-description{

      margin-top:10px;

      margin-bottom:0;

      font-size:12px;

      color:#6b7280;

    }


    .page-actions{

      display:flex;

      align-items:center;

      gap:8px;

    }


    @media(max-width:640px){

      .page-header{

        flex-direction:column;

        align-items:flex-start;

      }

    }

  `]

})
export class PageHeaderComponent {

  @Input() title!: string;

  @Input() description?: string;

  @Input() actions?: string;

}