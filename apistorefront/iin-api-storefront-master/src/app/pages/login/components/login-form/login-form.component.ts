import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { DataListService } from '../../../../shared/services/data-list.service';

/**
 * This class represents the LoginFormComponent.
 */
@Component({
  selector: 'app-sd-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  showError = false;

  /**
   * Creates an instance of the LoginFormComponent
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service: DataListService,
              private cookieService: CookieService) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+')]],
        password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  // click Login button
  clickLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.service.login(this.f.email.value, this.f.password.value).subscribe((response) => {
        this.cookieService.set('userName', 'Michele Zudith', null, '/');
        this.cookieService.set('myAPIList', JSON.stringify([{apiName: 'CRYPTO SIGNAL', expanded: false}]));
        console.log(this.cookieService.get('myAPIList'));

        this.service.isLoggedIn = true;

        const role = this.cookieService.get('role');
        switch (role) {
          case 'user':
            this.router.navigate(['/survey']);
            break;
          case 'admin':
          case 'developer':
            this.router.navigate(['/dashboard']);
            break;
        }
      }, (err) => {
        console.error(`Error ${err.status} - ${err.error}`);
        this.showError = true;
      });
    }
  }
}
