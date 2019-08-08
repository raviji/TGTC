import { Component, Input } from '@angular/core';

/**
 * This class represents the ManageApiSupportComponent.
 */
@Component({
  selector: 'app-sd-manage-api-support',
  templateUrl: 'manage-api-support.component.html',
  styleUrls: ['manage-api-support.component.scss']
})
export class ManageApiSupportComponent {
  @Input() dataList: any[];
}
