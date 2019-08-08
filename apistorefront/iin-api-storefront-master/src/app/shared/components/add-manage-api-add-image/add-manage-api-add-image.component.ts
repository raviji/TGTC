import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

/**
 * This class represents the AddManageApiAddImageComponent.
 */
@Component({
  selector: 'app-sd-add-manage-api-add-image',
  templateUrl: 'add-manage-api-add-image.component.html',
  styleUrls: ['add-manage-api-add-image.component.scss']
})
export class AddManageApiAddImageComponent implements OnInit {
  @Input() dataListDropdown: any[];
  @Input() addAPIFormData = {
    apiName: '',
    shortDescription: '',
    categories: ''
  };
  @Input() dataList: any = {
    imgUrl: '',
    categories: '',
    apiName: '',
    website: '',
    shortDescription: '',
    longDescription: '',
    termOfUse: ''
  };
  @Input() pageType = '';

  @Output() clickNext: EventEmitter<string> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<string> = new EventEmitter();
  @Output() clickUpdate: EventEmitter<string> = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;

  formData = {
    categories: ''
  };
  imgUrl = '';

  /**
   * Creates an instance of the AddManageApiAddImageComponent
   */
  constructor(public validationService: ValidationService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.dataList);

    this.formGroup = this.formBuilder.group({
        apiName: ['', Validators.required],
        website: [''],
        shortDescription: ['', Validators.required],
        longDescription: [''],
        termOfUse: ['']
    });

    this.f.apiName.setValue(this.dataList['apiName']);
    this.f.website.setValue(this.dataList['website']);
    this.f.shortDescription.setValue(this.dataList['shortDescription']);
    this.f.longDescription.setValue(this.dataList['longDescription']);
    this.f.termOfUse.setValue(this.dataList['termOfUse']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Next
  next() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid
      || (this.dataList['categories'] === '')
      || (this.f.website.value !== '' && !this.validationService.checkURL(this.f.website.value))) {
      return;
    } else {
      this.clickNext.emit();
    }
  }

  // click Previous
  previous() {
    this.clickPrevious.emit();
  }

  // clickUpdate
  update() {
    this.next();

    this.clickUpdate.emit(this.f.apiName.value);
  }

  // select File
  selectFile(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.dataList['imgUrl'] = e.target['result'];
      });

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
