import { Component, Input } from '@angular/core';

/**
 * This class represents the DashboardRecommendedApiComponent.
 */
@Component({
  selector: 'app-sd-dashboard-recommended-api',
  templateUrl: 'dashboard-recommended-api.component.html',
  styleUrls: ['dashboard-recommended-api.component.scss']
})
export class DashboardRecommendedApiComponent {
  @Input() dataList: any[];
}
