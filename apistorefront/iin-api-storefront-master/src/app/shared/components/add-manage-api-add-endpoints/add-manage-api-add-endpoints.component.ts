import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the AddManageApiAddEndpointsComponent.
 */
@Component({
  selector: 'app-sd-add-manage-api-add-endpoints',
  templateUrl: 'add-manage-api-add-endpoints.component.html',
  styleUrls: ['add-manage-api-add-endpoints.component.scss']
})
export class AddManageApiAddEndpointsComponent {
  @Input() dataListDropdown: any[];
  @Input() dataList: any = {
    groupsList: [],
    endpointsList: []
  };
  @Input() pageType = '';

  @Output() clickNext: EventEmitter<string> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<string> = new EventEmitter();

  modalData = {
    name: '', // values: 'addPlanType', 'addGroup', 'addEndpoint',
    data: null
  };

  // click Next
  next() {
    this.clickNext.emit();
  }

  // click Previous
  previous() {
    this.clickPrevious.emit();
  }

  // click Add Group
  clickAddGroup() {
    this.modalData['name'] = 'addGroup';
    this.modalData['data'] = {
      group: ''
    };
  }

  // click Add Endpoint
  clickAddEndpoint() {
    this.modalData['name'] = 'addEndpoint';
    this.modalData['data'] = {
      endpoint: '',
      group: '',
      method: '',
      description: ''
    };
  }

  // edit Group Item
  editGroupItem(index) {
    this.modalData['name'] = 'editGroup';
    this.modalData['data'] = this.dataList['groupsList'][index];
  }

  // edit Endpoint Item
  editEndpointItem(index) {
    this.modalData['name'] = 'editEndpoint';
    this.modalData['data'] = this.dataList['endpointsList'][index];
  }

  // save Group
  saveGroup(event) {
    switch (this.modalData['name']) {
      case 'addGroup':
        this.dataList['groupsList'].push(this.modalData['data']);
        this.dataListDropdown['groupDropdown'].push({
          option: this.modalData['data']['group']
        });
        break;
      case 'editGroup':
        break;
    }

    this.modalData['name'] = '';
  }

  // save Endpoint
  saveEndpoint(event) {
    switch (this.modalData['name']) {
      case 'addEndpoint':
        this.dataList['endpointsList'].push(this.modalData['data']);
        break;
      case 'editEndpoint':
        break;
    }

    this.modalData['name'] = '';
  }

  // delete Group Item
  deleteGroupItem(index) {
    this.dataList['groupsList'].splice(index, 1);
  }

  // delete Endpoint Item
  deleteEndpointItem(index) {
    this.dataList['endpointsList'].splice(index, 1);
  }
}
