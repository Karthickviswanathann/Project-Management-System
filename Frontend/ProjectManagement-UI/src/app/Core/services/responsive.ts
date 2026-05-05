import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private MOBILE_BREAKPOINT = 768;

  private mobileSubject = new BehaviorSubject<boolean>(
    window.innerWidth < this.MOBILE_BREAKPOINT
  );

  isMobile$ = this.mobileSubject.asObservable();

  constructor() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.mobileSubject.next(
      window.innerWidth < this.MOBILE_BREAKPOINT
    );
  }

  get isMobile(): boolean {
    return this.mobileSubject.value;
  }
}