import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav ,MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [MatSidenav, MatSidenavModule],
  template: `
<mat-sidenav-container class="sheet-container">

  <mat-sidenav
    #sheet
    [mode]="'over'"
    [position]="side"
    class="sheet"
    [fixedInViewport]="true"
    [(opened)]="opened"
    (closedStart)="opened=false"
  >

    <!-- Close Button -->
    <button mat-icon-button class="close-btn" (click)="close()">
      ✕
    </button>

    <!-- Header -->
    <div class="sheet-header">
      <ng-content select="[sheetHeader]"></ng-content>
    </div>

    <!-- Content -->
    <div class="sheet-content">
      <ng-content></ng-content>
    </div>

    <!-- Footer -->
    <div class="sheet-footer">
      <ng-content select="[sheetFooter]"></ng-content>
    </div>

  </mat-sidenav>

  <!-- Trigger slot -->
  <ng-content select="[sheetTrigger]"></ng-content>

</mat-sidenav-container>
  `,
  styles: [`
.sheet-container {
  position: fixed;
  inset: 0;
}

/* backdrop */
::ng-deep .mat-drawer-backdrop {
  background: rgba(0,0,0,0.8);
}

/* sheet panel */
.sheet {
  width: 380px;
  background: #fff;
  padding: 20px;
  box-shadow: -10px 0 30px rgba(0,0,0,0.2);
  position: relative;
}

/* close button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* header */
.sheet-header {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 10px;
}

/* content */
.sheet-content {
  padding: 10px 0;
}

/* footer */
.sheet-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
  `]
})
export class SheetComponent {

  @ViewChild('sheet') sheet!: MatSidenav;

  @Input() side: 'start' | 'end' = 'end'; // left/right
  opened = false;

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
    this.sheet.close();
  }
}