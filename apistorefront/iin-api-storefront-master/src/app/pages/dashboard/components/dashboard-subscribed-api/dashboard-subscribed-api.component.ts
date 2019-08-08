import { Component, Input } from '@angular/core';

/**
 * This class represents the DashboardSubscribedApiComponent.
 */
@Component({
  selector: 'app-sd-dashboard-subscribed-api',
  templateUrl: 'dashboard-subscribed-api.component.html',
  styleUrls: ['dashboard-subscribed-api.component.scss']
})
export class DashboardSubscribedApiComponent {
  @Input() dataList: any[];
}
