import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',

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

      font-size:32px;

      font-weight:600;

      letter-spacing:-0.5px;

      color:#111827;

    }


    .page-description{

      margin-top:4px;

      margin-bottom:0;

      font-size:14px;

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