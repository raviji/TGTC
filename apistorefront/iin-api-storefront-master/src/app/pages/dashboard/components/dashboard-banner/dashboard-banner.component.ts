import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the DashboardBannerComponent.
 */
@Component({
  selector: 'app-sd-dashboard-banner',
  templateUrl: 'dashboard-banner.component.html',
  styleUrls: ['dashboard-banner.component.scss']
})
export class DashboardBannerComponent {
  @Input() currentTab = '';
  @Input() dataList: any[] = null;
  @Output() changeTab: EventEmitter<string> = new EventEmitter();

  // click Tab
  clickTab(tabName) {
    this.changeTab.emit(tabName);
  }
}
