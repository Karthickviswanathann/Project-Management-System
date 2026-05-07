import {
  Component,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BreadcrumbItem {

  label: string;

  link?: string;

}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],

  template: `

<nav
  class="breadcrumb"
  aria-label="breadcrumb"
>

  <ol class="breadcrumb-list">

    <ng-container
      *ngFor="
        let item of items;
        let last = last;
        let i = index
      "
    >

      <!-- ITEM -->

      <li class="breadcrumb-item">

        <!-- LINK -->

        <a
          *ngIf="!last"
          [routerLink]="item.link"
          class="breadcrumb-link"
        >

          {{ item.label }}

        </a>


        <!-- CURRENT PAGE -->

        <span
          *ngIf="last"
          class="breadcrumb-page"
        >

          {{ item.label }}

        </span>

      </li>


      <!-- SEPARATOR -->

      <li
        *ngIf="!last"
        class="breadcrumb-separator"
      >

        ›

      </li>

    </ng-container>

  </ol>

</nav>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* BREADCRUMB */

.breadcrumb{

  width:100%;
}


/* LIST */

.breadcrumb-list{

  display:flex;
  align-items:center;
  flex-wrap:wrap;

  gap:8px;

  list-style:none;

  padding:0;
  margin:0;

  font-size:14px;

  color:#64748b;
}


/* ITEM */

.breadcrumb-item{

  display:flex;
  align-items:center;
}


/* LINK */

.breadcrumb-link{

  text-decoration:none;

  color:#64748b;

  transition:.2s;
}

.breadcrumb-link:hover{

  color:#0f172a;
}


/* PAGE */

.breadcrumb-page{

  color:#0f172a;

  font-weight:500;
}


/* SEPARATOR */

.breadcrumb-separator{

  color:#94a3b8;

  display:flex;
  align-items:center;

  font-size:14px;
}


/* MOBILE */

@media(max-width:640px){

  .breadcrumb-list{

    gap:6px;

    font-size:13px;
  }

}

  `]
})
export class BreadcrumbComponent {

  @Input()
  items: BreadcrumbItem[] = [];

}