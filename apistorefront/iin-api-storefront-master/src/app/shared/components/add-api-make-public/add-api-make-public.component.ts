import { Component, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the AddApiMakePublicComponent.
 */
@Component({
  selector: 'app-sd-add-api-make-public',
  templateUrl: 'add-api-make-public.component.html',
  styleUrls: ['add-api-make-public.component.scss']
})
export class AddApiMakePublicComponent {
  @Output() clickNext: EventEmitter<string> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<string> = new EventEmitter();

  apiVisibility = false;

  // click Next
  next() {
    this.clickNext.emit();
  }

  // click Previous
  previous() {
    this.clickPrevious.emit();
  }
}
