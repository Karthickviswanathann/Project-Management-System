import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarState = new BehaviorSubject<boolean>(true);

  isOpen$ = this.sidebarState.asObservable();

  get isOpen(): boolean {
    return this.sidebarState.value;
  }

  toggle() {
    this.sidebarState.next(!this.sidebarState.value);

    localStorage.setItem(
      'sidebar_state',
      this.sidebarState.value.toString()
    );
  }

  open() {
    this.sidebarState.next(true);
  }

  close() {
    this.sidebarState.next(false);
  }
}