import { Component, Input } from '@angular/core';

/**
 * This class represents the DetailTabAPISpecificationComponent.
 */
@Component({
  selector: 'app-sd-detail-tab-api-specification',
  templateUrl: 'detail-tab-api-specification.component.html',
  styleUrls: ['detail-tab-api-specification.component.scss']
})
export class DetailTabAPISpecificationComponent {
  @Input() dataList: any[] = null;
  @Input() dataListDropdown: any[];
  @Input() isLoggedIn = true;
}
