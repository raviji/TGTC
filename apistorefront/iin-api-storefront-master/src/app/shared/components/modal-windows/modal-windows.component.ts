import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * This class represents the ModalWindowsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows',
  templateUrl: 'modal-windows.component.html',
  styleUrls: ['modal-windows.component.scss']
})
export class ModalWindowsComponent implements OnInit {
  @Input() dataListDropdown: any[];
  @Input() modalData = {
    name: '', // values: 'addPlanType', 'addGroup', 'addEndpoint', 'addSecretHeaderOrParameter'
    data: null
  };

  formGroup: FormGroup;
  submitted = false;

  @Output() savePlanType: EventEmitter<any> = new EventEmitter();
  @Output() saveGroup: EventEmitter<any> = new EventEmitter();
  @Output() saveEndpoint: EventEmitter<any> = new EventEmitter();
  @Output() saveSecretHeaderOrParameter: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of the ModalWindowsComponent
   */
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.modalData['data']);
    switch (this.modalData['name']) {
      case 'addPlanType':
      case 'editPlanType':
        this.formGroup = this.formBuilder.group({
          planType: ['', Validators.required],
          subscriptionPrice: ['', Validators.required],
          planName: ['', Validators.required],
          planDescriptions: ['', Validators.required]
        });
        this.f.planType.setValue(this.modalData['data']['planType']);
        if (this.modalData['data']['subscriptionPrice'].toString() === '') {
          this.f.subscriptionPrice.setValue(this.modalData['data']['subscriptionPrice'].toString());
        } else {
          this.f.subscriptionPrice.setValue('$' + this.modalData['data']['subscriptionPrice'].toString());
        }
        this.f.planName.setValue(this.modalData['data']['planName']);
        this.f.planDescriptions.setValue(this.modalData['data']['planDescriptions']);
        break;
      case 'addGroup':
      case 'editGroup':
        this.formGroup = this.formBuilder.group({
          group: ['', Validators.required]
        });
        this.f.group.setValue(this.modalData['data']['group']);
        break;
      case 'addEndpoint':
      case 'editEndpoint':
        this.formGroup = this.formBuilder.group({
          endpoint: ['', Validators.required],
          method: ['', Validators.required],
          description: ['', Validators.required]
        });
        this.f.endpoint.setValue(this.modalData['data']['endpoint']);
        this.f.method.setValue(this.modalData['data']['method']);
        this.f.description.setValue(this.modalData['data']['description']);
        break;
      case 'addSecretHeaderOrParameter':
      case 'editSecretHeaderOrParameter':
        this.formGroup = this.formBuilder.group({
          key: ['', Validators.required],
          value: ['', Validators.required]
        });
        this.f.key.setValue(this.modalData['data']['key']);
        this.f.value.setValue(this.modalData['data']['value']);
        break;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Close
  clickClose() {
    this.modalData['name'] = '';
  }

  // click Plus icon
  clickPlus() {
    if (this.f.subscriptionPrice.value.toString() === '') {
      this.f.subscriptionPrice.setValue('$0');
    }
    this.f.subscriptionPrice.setValue('$' + (parseInt(this.f.subscriptionPrice.value.toString().replace('$', ''), 10) + 1));
  }

  // click Minus icon
  clickMinus() {
    if (this.f.subscriptionPrice.value.toString() === '') {
      this.f.subscriptionPrice.setValue('$0');
    }
    if (parseInt(this.f.subscriptionPrice.value.toString().replace('$', ''), 10) > 0) {
      this.f.subscriptionPrice.setValue('$' + (parseInt(this.f.subscriptionPrice.value.toString().replace('$', ''), 10) - 1));
    }
  }

  onlyDecimalNumberKey(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 16 && charCode > 31
        && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  // click Save Plan Type
  clickSavePlanType() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.modalData['data']['planType'] = this.f.planType.value;
      this.modalData['data']['subscriptionPrice'] = this.f.subscriptionPrice.value.toString().replace('$', '');
      this.modalData['data']['planName'] = this.f.planName.value;
      this.modalData['data']['planDescriptions'] = this.f.planDescriptions.value;
      this.savePlanType.emit();
    }
  }

  // click Save Group
  clickSaveGroup() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.modalData['data']['group'] = this.f.group.value;
      this.saveGroup.emit();
    }
  }

  // click Save Endpoint
  clickSaveEndpoint() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.modalData['data']['endpoint'] = this.f.endpoint.value;
      this.modalData['data']['method'] = this.f.method.value;
      this.modalData['data']['description'] = this.f.description.value;
      this.saveEndpoint.emit();
    }
  }

  // click Save Secret Header Or Parameter
  clickSaveSecretHeaderOrParameter() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.modalData['data']['key'] = this.f.key.value;
      this.modalData['data']['value'] = this.f.value.value;
      this.saveSecretHeaderOrParameter.emit();
    }
  }
}

