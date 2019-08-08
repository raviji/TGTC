import { Component, Input } from '@angular/core';

/**
 * This class represents the AddApiPlansPricingComponent.
 */
@Component({
  selector: 'app-sd-manage-api-plans-pricing',
  templateUrl: 'manage-api-plans-pricing.component.html',
  styleUrls: ['manage-api-plans-pricing.component.scss']
})
export class ManageApiPlansPricingComponent {
  @Input() dataListDropdown: any[];
  @Input() dataList: any[];

  modalData = {
    name: '', // values: 'addPlanType', 'addGroup', 'addEndpoint'
    data: null
  };

  // click Add Plan Type
  clickAddPlanType() {
    this.modalData['name'] = 'addPlanType';
    this.modalData['data'] = {
      planType: '',
      subscriptionPrice: '',
      planName: '',
      planDescriptions: ''
    };
  }

  // click Edit Plan Type
  clickEditPlanType(index) {
    this.modalData['name'] = 'editPlanType';
    this.modalData['data'] = this.dataList[index];
  }

  // save Plan Type
  savePlanType(event) {
    switch (this.modalData['name']) {
      case 'addPlanType':
        this.dataList.push(this.modalData['data']);
        break;
      case 'editPlanType':
        break;
    }

    this.modalData['name'] = '';
  }
}
