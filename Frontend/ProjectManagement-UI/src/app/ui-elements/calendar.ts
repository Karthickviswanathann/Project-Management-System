import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],

  template: `

<div class="calendar">

  <!-- HEADER -->

  <div class="calendar-header">

    <button
      class="nav-btn"
      (click)="previousMonth()"
    >

      ‹

    </button>


    <div class="month-title">

      {{ currentMonthName }}
      {{ currentYear }}

    </div>


    <button
      class="nav-btn"
      (click)="nextMonth()"
    >

      ›

    </button>

  </div>



  <!-- WEEK DAYS -->

  <div class="weekdays">

    <div
      class="weekday"
      *ngFor="let day of weekDays"
    >

      {{ day }}

    </div>

  </div>



  <!-- DAYS -->

  <div class="days-grid">

    <!-- EMPTY CELLS -->

    <div
      class="empty"
      *ngFor="let empty of emptyDays"
    ></div>



    <!-- DATE -->

    <button
      *ngFor="let day of days"
      class="day-btn"

      [class.today]="isToday(day)"

      [class.selected]="isSelected(day)"

      (click)="selectDate(day)"
    >

      {{ day }}

    </button>

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* CALENDAR */

.calendar{

  width:320px;

  background:white;

  border:1px solid #e2e8f0;

  border-radius:12px;

  padding:16px;

  box-shadow:0 2px 8px rgba(0,0,0,.05);
}


/* HEADER */

.calendar-header{

  display:flex;
  align-items:center;
  justify-content:space-between;

  margin-bottom:20px;
}


.month-title{

  font-size:16px;
  font-weight:600;

  color:#0f172a;
}


/* NAVIGATION */

.nav-btn{

  width:34px;
  height:34px;

  border:none;

  background:#f1f5f9;

  border-radius:8px;

  cursor:pointer;

  font-size:18px;

  transition:.2s;
}

.nav-btn:hover{

  background:#e2e8f0;
}


/* WEEKDAYS */

.weekdays{

  display:grid;

  grid-template-columns:repeat(7,1fr);

  margin-bottom:10px;
}


.weekday{

  text-align:center;

  font-size:13px;

  color:#64748b;

  font-weight:500;
}


/* GRID */

.days-grid{

  display:grid;

  grid-template-columns:repeat(7,1fr);

  gap:6px;
}


.empty{

  height:40px;
}


/* DAY BUTTON */

.day-btn{

  height:40px;

  border:none;

  border-radius:10px;

  background:transparent;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}

.day-btn:hover{

  background:#eff6ff;
}


/* TODAY */

.day-btn.today{

  border:1px solid #2563eb;

  color:#2563eb;

  font-weight:600;
}


/* SELECTED */

.day-btn.selected{

  background:#2563eb;

  color:white;

  font-weight:600;
}


/* MOBILE */

@media(max-width:480px){

  .calendar{

    width:100%;
  }

}

  `]
})
export class CalendarComponent {

  @Output()
  dateChange =
    new EventEmitter<Date>();


  currentDate = new Date();

  selectedDate =
    new Date();


  weekDays = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ];


  get currentMonthName(): string {

    return this.currentDate.toLocaleString(
      'default',
      {
        month:'long'
      }
    );

  }


  get currentYear(): number {

    return this.currentDate.getFullYear();

  }


  get days(): number[] {

    const totalDays =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0
      ).getDate();

    return Array.from(
      { length: totalDays },
      (_, i) => i + 1
    );

  }


  get emptyDays(): number[] {

    const firstDay =
      new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        1
      ).getDay();

    return Array(firstDay).fill(0);

  }


  previousMonth(): void {

    this.currentDate =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() - 1,
        1
      );

  }


  nextMonth(): void {

    this.currentDate =
      new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        1
      );

  }


  selectDate(day:number): void {

    this.selectedDate =
      new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        day
      );

    this.dateChange.emit(
      this.selectedDate
    );

  }


  isToday(day:number): boolean {

    const today = new Date();

    return (
      day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );

  }


  isSelected(day:number): boolean {

    return (
      day === this.selectedDate.getDate() &&
      this.currentDate.getMonth() === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear()
    );

  }

}