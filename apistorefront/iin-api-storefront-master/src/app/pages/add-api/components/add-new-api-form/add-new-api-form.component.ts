import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * This class represents the AddNewApiFormComponent.
 */
@Component({
  selector: 'app-sd-add-new-api-form',
  templateUrl: 'add-new-api-form.component.html',
  styleUrls: ['add-new-api-form.component.scss']
})
export class AddNewApiFormComponent implements OnInit {
  @Input() dataListDropdown: any[];
  @Input() addAPIFormData = {
    apiName: '',
    shortDescription: '',
    categories: ''
  };
  @Output() clickAddAPI: EventEmitter<string> = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;

  /**
   * Creates an instance of the AddNewApiFormComponent
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        apiName: ['', Validators.required],
        shortDescription: ['', Validators.required]
    });

    this.f.apiName.setValue(this.addAPIFormData['apiName']);
    this.f.shortDescription.setValue(this.addAPIFormData['shortDescription']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Add API
  addAPI() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid
      || (this.addAPIFormData['categories'] === '')) {
      return;
    } else {
      this.addAPIFormData['apiName'] = this.f.apiName.value;
      this.addAPIFormData['shortDescription'] = this.f.shortDescription.value;
      this.clickAddAPI.emit();
    }
  }
}
