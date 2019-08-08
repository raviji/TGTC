import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * This class represents the LandingBannerComponent.
 */
@Component({
  selector: 'app-sd-contact-us',
  templateUrl: 'contact-us.component.html',
  styleUrls: ['contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  formGroup: FormGroup;
  submitted = false;

  /**
   * Creates an instance of the ContactUsComponent
   */
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+')]],
        subject: ['', Validators.required],
        message: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Send Message
  sendMessage() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
    }
  }
}
