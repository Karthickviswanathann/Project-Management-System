import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,

  template: `

<div
  class="alert"
  [class.destructive]="variant === 'destructive'"
>

  <!-- ICON -->

  <div class="alert-icon">

    <ng-content select="[alert-icon]"></ng-content>

  </div>


  <!-- CONTENT -->

  <div class="alert-content">

    <!-- TITLE -->

    <h5 class="alert-title">

      {{ title }}

    </h5>


    <!-- DESCRIPTION -->

    <div class="alert-description">

      {{ description }}

    </div>

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* ALERT */

.alert{

  position:relative;

  width:100%;

  border:1px solid #e2e8f0;
  border-radius:12px;

  padding:18px 18px 18px 56px;

  background:white;
  color:#0f172a;

  display:flex;
  align-items:flex-start;

  min-height:70px;
}


/* ICON */

.alert-icon{

  position:absolute;

  left:18px;
  top:18px;

  font-size:18px;

  display:flex;
  align-items:center;
  justify-content:center;
}


/* CONTENT */

.alert-content{
  width:100%;
}


/* TITLE */

.alert-title{

  margin:0 0 6px;

  font-size:15px;
  font-weight:600;

  line-height:1.2;
}


/* DESCRIPTION */

.alert-description{

  font-size:14px;
  line-height:1.6;

  color:#64748b;
}


/* DESTRUCTIVE */

.alert.destructive{

  border-color:#ef444480;

  background:#fef2f2;

  color:#dc2626;
}


.alert.destructive .alert-description{
  color:#b91c1c;
}


/* MOBILE */

@media(max-width:640px){

  .alert{
    padding:16px 16px 16px 52px;
  }

}

  `]
})
export class AlertComponent {

  @Input()
  title = 'Alert Title';

  @Input()
  description = 'Alert Description';

  @Input()
  variant: 'default' | 'destructive' =
    'default';

}