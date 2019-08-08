import { Component } from '@angular/core';

/**
 * This class represents the FooterNonLoginComponent.
 */
@Component({
  selector: 'app-sd-footer-non-login',
  templateUrl: 'footer-non-login.component.html',
  styleUrls: ['footer-non-login.component.scss']
})
export class FooterNonLoginComponent {
  openCountryDropdown = false;

  countryValue = 'English';
  countryDropdown = [
    {
      option: 'English'
    },
    {
      option: 'United States'
    },
    {
      option: 'Chinese'
    }
  ];
}
