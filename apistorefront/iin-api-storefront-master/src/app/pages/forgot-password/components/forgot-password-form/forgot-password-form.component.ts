import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * This class represents the ForgotPasswordFormComponent.
 */
@Component({
  selector: 'app-sd-forgot-password-form',
  templateUrl: 'forgot-password-form.component.html',
  styleUrls: ['forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  /**
   * Creates an instance of the ForgotPasswordFormComponent
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+')]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Send Message
  clickSendMessage() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
