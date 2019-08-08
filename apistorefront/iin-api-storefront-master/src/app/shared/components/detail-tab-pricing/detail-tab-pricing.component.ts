import { Component, Input } from '@angular/core';

/**
 * This class represents the DetailTabPricingComponent.
 */
@Component({
  selector: 'app-sd-detail-tab-pricing',
  templateUrl: 'detail-tab-pricing.component.html',
  styleUrls: ['detail-tab-pricing.component.scss']
})
export class DetailTabPricingComponent {
  @Input() dataList: any[];
  @Input() isLoggedIn = true;
}
