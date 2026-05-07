import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],

  template: `

<div
  class="card"
  [ngClass]="className"
>

  <!-- HEADER -->

  <div
    *ngIf="title || description"
    class="card-header"
  >

    <div
      *ngIf="title"
      class="card-title"
    >

      {{ title }}

    </div>


    <div
      *ngIf="description"
      class="card-description"
    >

      {{ description }}

    </div>

  </div>



  <!-- CONTENT -->

  <div class="card-content">

    <ng-content></ng-content>

  </div>



  <!-- FOOTER -->

  <div
    *ngIf="footer"
    class="card-footer"
  >

    {{ footer }}

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* CARD */

.card{

  width:100%;

  background:white;

  border:1px solid #e2e8f0;

  border-radius:16px;

  box-shadow:
    0 2px 8px rgba(0,0,0,.05);

  overflow:hidden;
}


/* HEADER */

.card-header{

  padding:24px;

  display:flex;

  flex-direction:column;

  gap:6px;
}


/* TITLE */

.card-title{

  font-size:20px;

  font-weight:600;

  color:#0f172a;

  line-height:1.2;
}


/* DESCRIPTION */

.card-description{

  font-size:14px;

  color:#64748b;
}


/* CONTENT */

.card-content{

  padding:24px;
}


/* FOOTER */

.card-footer{

  padding:24px;

  border-top:1px solid #e2e8f0;

  display:flex;
  align-items:center;
}


/* MOBILE */

@media(max-width:640px){

  .card-header,
  .card-content,
  .card-footer{

    padding:18px;
  }

}

  `]
})
export class CardComponent {

  @Input()
  title = '';


  @Input()
  description = '';


  @Input()
  footer = '';


  @Input()
  className = '';

}