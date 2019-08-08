import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the ManageApiBannerComponent.
 */
@Component({
  selector: 'app-sd-manage-api-banner',
  templateUrl: 'manage-api-banner.component.html',
  styleUrls: ['manage-api-banner.component.scss']
})
export class ManageApiBannerComponent {
  @Input() bannerType = '';
  @Input() currentTab = '';
  @Output() changeTab: EventEmitter<string> = new EventEmitter();

  // click Tab
  clickTab(tabName) {
    this.changeTab.emit(tabName);
  }
}
