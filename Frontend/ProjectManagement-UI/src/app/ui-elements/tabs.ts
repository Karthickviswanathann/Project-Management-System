import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
<div class="tabs">

  <!-- TAB LIST -->
  <div class="tab-list">
    <button
      *ngFor="let tab of tabs"
      class="tab-trigger"
      [class.active]="activeTab === tab.value"
      (click)="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>

  <!-- TAB CONTENT -->
  <div class="tab-content">
    <ng-content></ng-content>
  </div>

</div>
  `,
  styles: [`

.tabs {
  width: 100%;
}

/* TAB LIST (Radix TabsList) */
.tab-list {
  display: inline-flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
  gap: 4px;
}

/* TAB BUTTON (Trigger) */
.tab-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: #6b7280;
  background: transparent;
  transition: all 0.2s ease;
}

/* ACTIVE TAB (data-state=active equivalent) */
.tab-trigger.active {
  background: white;
  color: #111827;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* focus like Radix */
.tab-trigger:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}

/* CONTENT AREA */
.tab-content {
  margin-top: 8px;
  outline: none;
}
  `]
})
export class TabsComponent {

  @Input() tabs: { label: string; value: string }[] = [];

  activeTab: string = '';

  ngOnInit() {
    if (this.tabs.length) {
      this.activeTab = this.tabs[0].value;
    }
  }

  selectTab(value: string) {
    this.activeTab = value;
  }
}