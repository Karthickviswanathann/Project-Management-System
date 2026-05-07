import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
<div class="table-wrapper">
  <table class="table">
    <ng-content></ng-content>
  </table>
</div>
  `,
  styles: [`

/* wrapper */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* table base */
.table {
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
  font-size: 14px;
  color: #0f172a;
}

/* HEADER */
thead tr {
  border-bottom: 1px solid #e5e7eb;
}

th {
  height: 40px;
  padding: 0 8px;
  text-align: left;
  font-weight: 500;
  color: #6b7280;
  vertical-align: middle;
}

/* BODY */
tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: rgba(148,163,184,0.12);
}

/* last row border remove */
tbody tr:last-child {
  border-bottom: 0;
}

/* CELL */
td {
  padding: 8px;
  vertical-align: middle;
}

/* FOOTER */
tfoot {
  border-top: 1px solid #e5e7eb;
  background: rgba(148,163,184,0.1);
  font-weight: 500;
}

tfoot tr:last-child {
  border-bottom: 0;
}

/* CAPTION */
caption {
  margin-top: 16px;
  font-size: 13px;
  color: #6b7280;
}

/* checkbox alignment helper (Radix style support) */
td:has(input[type="checkbox"]),
th:has(input[type="checkbox"]) {
  padding-right: 0;
}

input[type="checkbox"] {
  transform: translateY(2px);
}
  `]
})
export class TableComponent {}