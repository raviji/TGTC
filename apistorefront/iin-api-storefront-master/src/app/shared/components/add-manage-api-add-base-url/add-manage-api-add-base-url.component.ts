import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

/**
 * This class represents the AddManageApiAddBaseUrlComponent.
 */
@Component({
  selector: 'app-sd-add-manage-api-add-base-url',
  templateUrl: 'add-manage-api-add-base-url.component.html',
  styleUrls: ['add-manage-api-add-base-url.component.scss']
})
export class AddManageApiAddBaseUrlComponent implements OnInit {
  @Input() dataListDropdown: any[];
  @Input() dataList: any = {
    baseURL: '',
    baseURLFirewallSettings: '',
    authentication: '',
    secretHeaderOrParameterList: [],
    apiVisibility: false
  };
  @Input() pageType = '';

  @Output() clickNext: EventEmitter<string> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<string> = new EventEmitter();
  @Output() clickDeleteAPI: EventEmitter<string> = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;
  saved = false;

  modalData = {
    name: '', // values: 'addSecretHeaderOrParameter', 'editSecretHeaderOrParameter',
    data: null
  };

  /**
   * Creates an instance of the AddManageApiAddBaseUrlComponent
   */
  constructor(public validationService: ValidationService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.dataList);

    this.formGroup = this.formBuilder.group({
        baseURL: ['', Validators.required],
        baseURLFirewallSettings: ['']
    });

    this.f.baseURL.setValue(this.dataList['baseURL']);
    this.f.baseURLFirewallSettings.setValue(this.dataList['baseURLFirewallSettings']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Next
  next() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid
      || (this.dataList['authentication'] === '')
      || !this.validationService.checkURL(this.f.baseURL.value)) {
      return;
    } else {
      this.clickNext.emit();
    }
  }

  // click Previous
  previous() {
    this.clickPrevious.emit();
  }

  // click Save
  clickSave() {
    this.saved = true;
  }

  // click Add Secret Header Or Parameter
  clickAddSecretHeaderOrParameter() {
    this.modalData['name'] = 'addSecretHeaderOrParameter';
    this.modalData['data'] = {
      key: '',
      value: ''
    };
  }

  // edit Secret Header Or Parameter Item
  editSecretHeaderOrParameterItem(index) {
    this.modalData['name'] = 'editSecretHeaderOrParameter';
    this.modalData['data'] = this.dataList['secretHeaderOrParameterList'][index];
  }

  // save Secret Header Or Parameter
  saveSecretHeaderOrParameter(event) {
    switch (this.modalData['name']) {
      case 'addSecretHeaderOrParameter':
        this.dataList['secretHeaderOrParameterList'].push(this.modalData['data']);
        break;
      case 'editSecretHeaderOrParameter':
        break;
    }

    this.modalData['name'] = '';
  }

  // delete Secret Header Or Parameter Item
  deleteSecretHeaderOrParameterItem(index) {
    this.dataList['secretHeaderOrParameterList'].splice(index, 1);
  }

  // delete API
  deleteAPI() {
    this.clickDeleteAPI.emit();
  }
}
