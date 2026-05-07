import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,

  template: `

<div class="accordion">

  <div
    class="accordion-item"
    *ngFor="let item of items; let i = index"
  >

    <!-- HEADER -->

    <button
      class="accordion-trigger"
      (click)="toggle(i)"
    >

      <span>
        {{ item.title }}
      </span>

      <span
        class="icon"
        [class.rotate]="openedIndex === i"
      >
        ▼
      </span>

    </button>


    <!-- CONTENT -->

    <div
      class="accordion-content"
      [class.open]="openedIndex === i"
    >

      <div class="accordion-body">

        {{ item.content }}

      </div>

    </div>

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


.accordion{
  width:100%;
  border-radius:10px;
  overflow:hidden;
  border:1px solid #e2e8f0;
  background:#fff;
}


/* ITEM */

.accordion-item{
  border-bottom:1px solid #e2e8f0;
}

.accordion-item:last-child{
  border-bottom:none;
}


/* HEADER */

.accordion-trigger{

  width:100%;

  border:none;
  background:white;

  padding:18px 20px;

  display:flex;
  align-items:center;
  justify-content:space-between;

  cursor:pointer;

  font-size:15px;
  font-weight:600;

  transition:.2s;
}

.accordion-trigger:hover{
  background:#f8fafc;
}


/* ICON */

.icon{
  transition:.3s;
  font-size:12px;
}

.icon.rotate{
  transform:rotate(180deg);
}


/* CONTENT */

.accordion-content{

  max-height:0;
  overflow:hidden;

  transition:max-height .3s ease;
}


.accordion-content.open{
  max-height:300px;
}


.accordion-body{

  padding:0 20px 20px;

  font-size:14px;
  line-height:1.6;

  color:#64748b;
}

  `]
})
export class AccordionComponent {

  @Input() items: {
    title: string;
    content: string;
  }[] = [];

  openedIndex: number | null = null;


  toggle(index: number): void {

    if (this.openedIndex === index) {

      this.openedIndex = null;

    } else {

      this.openedIndex = index;

    }

  }

}