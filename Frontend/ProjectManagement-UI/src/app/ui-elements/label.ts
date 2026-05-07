import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],

  template: `

<label
  [for]="for"
  class="app-label"
  [ngClass]="className"
>

  <ng-content></ng-content>

</label>

  `,

  styles: [`

.app-label{

  font-size:14px;

  font-weight:500;

  line-height:1;

  color:#111827;

  display:inline-block;
}


.app-label.disabled{

  cursor:not-allowed;

  opacity:.7;
}

  `]
})

export class LabelComponent {

  @Input()
  for = '';

  @Input()
  className = '';

}