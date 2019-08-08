import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]',
})
export class ScrollTrackerDirective {
  @Output() scrolled = new EventEmitter<any>();

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    // do tracking
    // Listen to click events in the component
    const tracker = event.target;
    let endReached = false;
    const limit = tracker.scrollHeight - tracker.clientHeight;

    if (event.target.scrollTop === limit) {
      endReached = true;
    }

    this.scrolled.emit({
      pos: event.target.scrollTop,
      endReached
    });
  }
}
