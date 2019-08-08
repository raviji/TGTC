import { Component, Input } from '@angular/core';

/**
 * This class represents the DetailTabKeyFeaturesComponent.
 */
@Component({
  selector: 'app-sd-detail-tab-key-features',
  templateUrl: 'detail-tab-key-features.component.html',
  styleUrls: ['detail-tab-key-features.component.scss']
})
export class DetailTabKeyFeaturesComponent {
  @Input() dataList: any[];
}
