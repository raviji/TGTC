import { Component, Input } from '@angular/core';

/**
 * This class represents the LandingBannerComponent.
 */
@Component({
  selector: 'app-sd-documentations',
  templateUrl: 'documentations.component.html',
  styleUrls: ['documentations.component.scss']
})
export class DocumentationsComponent {
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
