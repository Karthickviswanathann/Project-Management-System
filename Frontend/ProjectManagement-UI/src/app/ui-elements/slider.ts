import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  template: `
<div
  #track
  class="slider-track"
  (mousedown)="startDrag($event)"
  (touchstart)="startDrag($event)"
>
  <!-- Range (filled part) -->
  <div class="slider-range" [style.width.%]="value"></div>

  <!-- Thumb -->
  <div
    class="slider-thumb"
    [style.left.%]="value"
    (mousedown)="startDrag($event)"
    (touchstart)="startDrag($event)"
  ></div>
</div>
  `,
  styles: [`
.slider-track {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(59,130,246,0.2);
  border-radius: 999px;
  touch-action: none;
}

.slider-range {
  position: absolute;
  height: 100%;
  background: #3b82f6;
  border-radius: 999px;
  left: 0;
  top: 0;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: white;
  border: 1px solid rgba(59,130,246,0.5);
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
}

.slider-thumb:active {
  transform: translate(-50%, -50%) scale(1.1);
}
  `]
})
export class SliderComponent {

  @ViewChild('track', { static: true }) track!: ElementRef;

  @Input() value: number = 30; // 0 - 100
  @Output() valueChange = new EventEmitter<number>();

  private dragging = false;

  startDrag(event: MouseEvent | TouchEvent) {
    this.dragging = true;
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.stopDrag);

    this.updateValue(event);
  }

  onMove = (event: any) => {
    if (!this.dragging) return;
    this.updateValue(event);
  };

  stopDrag = () => {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.onMove);
    document.removeEventListener('touchend', this.stopDrag);
  };

  private updateValue(event: MouseEvent | TouchEvent) {
    const rect = this.track.nativeElement.getBoundingClientRect();
    const clientX = event instanceof TouchEvent
      ? event.touches[0].clientX
      : event.clientX;

    let percent = ((clientX - rect.left) / rect.width) * 100;

    percent = Math.max(0, Math.min(100, percent));

    this.value = percent;
    this.valueChange.emit(this.value);
  }
}