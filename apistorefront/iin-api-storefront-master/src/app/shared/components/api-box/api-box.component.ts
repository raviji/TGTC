import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the APIBoxComponent.
 */
@Component({
  selector: 'app-sd-api-box',
  templateUrl: 'api-box.component.html',
  styleUrls: ['api-box.component.scss']
})
export class APIBoxComponent {
  @Input() itemData: any[];
  @Input() viewType = '';
  @Input() isLoggedIn = true;
  @Input() isShownTag = true;
}
