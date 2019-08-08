import { Component, Input } from '@angular/core';

/**
 * This class represents the DetailTabDescriptionComponent.
 */
@Component({
  selector: 'app-sd-detail-tab-description',
  templateUrl: 'detail-tab-description.component.html',
  styleUrls: ['detail-tab-description.component.scss']
})
export class DetailTabDescriptionComponent {
  @Input() dataList: any[];
}
