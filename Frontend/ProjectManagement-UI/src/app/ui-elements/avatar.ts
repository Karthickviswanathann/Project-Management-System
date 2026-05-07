import {
  Component,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],

  template: `

<div
  class="avatar"
  [style.width.px]="size"
  [style.height.px]="size"
>

  <!-- IMAGE -->

  <img
    *ngIf="src && !imageError"
    [src]="src"
    [alt]="alt"
    class="avatar-image"
    (error)="onImageError()"
  />


  <!-- FALLBACK -->

  <div
    *ngIf="!src || imageError"
    class="avatar-fallback"
  >

    {{ fallback }}

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* AVATAR */

.avatar{

  position:relative;

  overflow:hidden;

  border-radius:50%;

  display:flex;
  align-items:center;
  justify-content:center;

  flex-shrink:0;

  background:#e2e8f0;
}


/* IMAGE */

.avatar-image{

  width:100%;
  height:100%;

  object-fit:cover;

  display:block;
}


/* FALLBACK */

.avatar-fallback{

  width:100%;
  height:100%;

  display:flex;
  align-items:center;
  justify-content:center;

  border-radius:50%;

  background:#cbd5e1;

  color:#0f172a;

  font-size:14px;
  font-weight:600;

  text-transform:uppercase;
}

  `]
})
export class AvatarComponent {

  @Input()
  src = '';

  @Input()
  alt = 'avatar';

  @Input()
  fallback = 'U';

  @Input()
  size = 40;


  imageError = false;


  onImageError(): void {

    this.imageError = true;

  }

}