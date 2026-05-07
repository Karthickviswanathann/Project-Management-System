import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

 private MOBILE_BREAKPOINT = 768;

  private mobileSubject =
    new BehaviorSubject<boolean>(false);

  isMobile$ =
    this.mobileSubject.asObservable();


  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {

    this.checkScreen();

    if (isPlatformBrowser(this.platformId)) {

      window.addEventListener(
        'resize',
        () => this.checkScreen()
      );

    }

  }


  checkScreen(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.mobileSubject.next(
        window.innerWidth < this.MOBILE_BREAKPOINT
      );

    }

  }


  get isMobile(): boolean {

    return this.mobileSubject.value;

  }
}