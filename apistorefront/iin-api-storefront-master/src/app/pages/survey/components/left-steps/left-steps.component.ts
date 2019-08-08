import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the LeftStepsComponent.
 */
@Component({
  selector: 'app-sd-left-steps',
  templateUrl: 'left-steps.component.html',
  styleUrls: ['left-steps.component.scss']
})
export class LeftStepsComponent {
  @Input() dataList: any[];
  @Input() currentIndex = 0;

  @Output() clickNext: EventEmitter<string> = new EventEmitter();

  // click Next
  next() {
    this.clickNext.emit();
  }
}
