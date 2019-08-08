import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * This class represents the ProfileFormComponent.
 */
@Component({
  selector: 'app-sd-profile-form',
  templateUrl: 'profile-form.component.html',
  styleUrls: ['profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @Input() dataList: any[];
  @Output() clickUpdateProfile: EventEmitter<string> = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;

  /**
   * Creates an instance of the AddNewApiFormComponent
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+')]],
        phoneNumber: ['', Validators.required],
        github: ['', Validators.required]
    });

    this.f.fullName.setValue(this.dataList['fullName']);
    this.f.email.setValue(this.dataList['email']);
    this.f.phoneNumber.setValue(this.dataList['phoneNumber']);
    this.f.github.setValue(this.dataList['github']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Update Profile
  updateProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.clickUpdateProfile.emit();
    }
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
