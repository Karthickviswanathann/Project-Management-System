import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-aspect-ratio',
  standalone: true,

  template: `

<div
  class="aspect-ratio-wrapper"
  [style.paddingTop.%]="paddingTop"
>

  <div class="aspect-ratio-content">

    <ng-content></ng-content>

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* WRAPPER */

.aspect-ratio-wrapper{

  position:relative;

  width:100%;

  overflow:hidden;
}


/* CONTENT */

.aspect-ratio-content{

  position:absolute;

  inset:0;

  width:100%;
  height:100%;
}


/* IMAGE SUPPORT */

.aspect-ratio-content img{

  width:100%;
  height:100%;

  object-fit:cover;

  display:block;
}

  `]
})
export class AspectRatioComponent {

  @Input()
  ratio = 16 / 9;


  get paddingTop(): number {

    return (1 / this.ratio) * 100;

  }

}