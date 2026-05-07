import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  AfterContentInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  template: `
    <div class="carousel-item">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .carousel-item{
      min-width:100%;
      flex:0 0 100%;
      padding:0 10px;
      box-sizing:border-box;
    }
  `]
})
export class CarouselItemComponent {}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `

<div
  class="carousel-wrapper"
  tabindex="0"
  (keydown)="handleKey($event)"
>

  <!-- Previous -->
  <button
    class="nav-btn prev"
    (click)="prev()"
    [disabled]="currentIndex === 0"
  >
    ←
  </button>


  <!-- Track -->
  <div class="carousel-container">

    <div
      class="carousel-track"
      [style.transform]="getTransform()"
      [class.vertical]="orientation === 'vertical'"
    >

      <ng-content select="app-carousel-item"></ng-content>

    </div>

  </div>


  <!-- Next -->
  <button
    class="nav-btn next"
    (click)="next()"
    [disabled]="currentIndex >= totalSlides - 1"
  >
    →
  </button>

</div>

  `,
  styles: [`

.carousel-wrapper{

  position:relative;
  width:100%;

  display:flex;
  align-items:center;
  justify-content:center;
}


.carousel-container{

  overflow:hidden;
  width:100%;
}


.carousel-track{

  display:flex;
  transition:transform .4s ease;
  width:100%;
}


.carousel-track.vertical{

  flex-direction:column;
}


.nav-btn{

  width:40px;
  height:40px;

  border:none;
  border-radius:50%;

  background:#fff;
  box-shadow:0 2px 8px rgba(0,0,0,.2);

  cursor:pointer;

  position:absolute;
  z-index:10;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:18px;
}


.prev{

  left:-15px;
}


.next{

  right:-15px;
}


.nav-btn:disabled{

  opacity:.4;
  cursor:not-allowed;
}

  `]
})
export class CarouselComponent implements AfterContentInit {

  @Input()
  orientation:'horizontal' | 'vertical' = 'horizontal';

  @ContentChildren(CarouselItemComponent)
  items!: QueryList<CarouselItemComponent>;

  currentIndex = 0;

  totalSlides = 0;


  ngAfterContentInit(): void {

    this.totalSlides =
      this.items.length;

  }


  next(): void {

    if (
      this.currentIndex <
      this.totalSlides - 1
    ) {

      this.currentIndex++;

    }

  }


  prev(): void {

    if (
      this.currentIndex > 0
    ) {

      this.currentIndex--;

    }

  }


  getTransform(): string {

    if (
      this.orientation === 'horizontal'
    ) {

      return `translateX(-${this.currentIndex * 100}%)`;

    }

    return `translateY(-${this.currentIndex * 100}%)`;

  }


  handleKey(
    event: KeyboardEvent
  ): void {

    if (
      event.key === 'ArrowRight'
    ) {

      this.next();

    }

    if (
      event.key === 'ArrowLeft'
    ) {

      this.prev();

    }

  }

}