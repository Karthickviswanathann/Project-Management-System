import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="pagination-container"
      role="navigation"
      aria-label="pagination"
      [ngClass]="className"
    >
      <ul class="pagination-content">

        <!-- Previous -->
        <li>
          <button
            class="pagination-btn"
            [disabled]="currentPage === 1"
            (click)="previousPage()"
          >
            ← Previous
          </button>
        </li>

        <!-- First -->
        <li *ngIf="showFirst">
          <button
            class="pagination-btn"
            [class.active]="currentPage === 1"
            (click)="goToPage(1)"
          >
            1
          </button>
        </li>

        <!-- Left Ellipsis -->
        <li *ngIf="showLeftEllipsis">
          <span class="pagination-ellipsis">...</span>
        </li>

        <!-- Pages -->
        <li *ngFor="let page of visiblePages">
          <button
            class="pagination-btn"
            [class.active]="page === currentPage"
            (click)="goToPage(page)"
          >
            {{ page }}
          </button>
        </li>

        <!-- Right Ellipsis -->
        <li *ngIf="showRightEllipsis">
          <span class="pagination-ellipsis">...</span>
        </li>

        <!-- Last -->
        <li *ngIf="showLast">
          <button
            class="pagination-btn"
            [class.active]="currentPage === totalPages"
            (click)="goToPage(totalPages)"
          >
            {{ totalPages }}
          </button>
        </li>

        <!-- Next -->
        <li>
          <button
            class="pagination-btn"
            [disabled]="currentPage === totalPages"
            (click)="nextPage()"
          >
            Next →
          </button>
        </li>

      </ul>
    </nav>
  `,
  styles: [`
    .pagination-container{
      width:100%;
      display:flex;
      justify-content:center;
      margin-top:20px;
    }

    .pagination-content{
      display:flex;
      align-items:center;
      gap:6px;
      list-style:none;
      padding:0;
      margin:0;
    }

    .pagination-btn{
      min-width:36px;
      height:36px;
      padding:0 12px;
      border:none;
      border-radius:6px;
      background:transparent;
      cursor:pointer;
      font-size:14px;
      transition:0.2s;
    }

    .pagination-btn:hover{
      background:#f3f4f6;
    }

    .pagination-btn.active{
      border:1px solid #d1d5db;
      background:#ffffff;
      font-weight:600;
    }

    .pagination-btn:disabled{
      opacity:0.5;
      cursor:not-allowed;
    }

    .pagination-ellipsis{
      display:flex;
      align-items:center;
      justify-content:center;
      width:36px;
      height:36px;
      font-size:18px;
    }
  `]
})
export class PaginationComponent {

  @Input() totalPages = 1;
  @Input() currentPage = 1;
  @Input() className = '';

  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];

    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showFirst(): boolean {
    return this.totalPages > 0;
  }

  get showLast(): boolean {
    return this.totalPages > 1;
  }

  get showLeftEllipsis(): boolean {
    return this.currentPage > 3;
  }

  get showRightEllipsis(): boolean {
    return this.currentPage < this.totalPages - 2;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}