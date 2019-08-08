import { Component, Input } from '@angular/core';

/**
 * This class represents the LandingBannerComponent.
 */
@Component({
  selector: 'app-sd-landing-banner',
  templateUrl: 'landing-banner.component.html',
  styleUrls: ['landing-banner.component.scss']
})
export class LandingBannerComponent {
  @Input() dataList: any[] = null;
}
