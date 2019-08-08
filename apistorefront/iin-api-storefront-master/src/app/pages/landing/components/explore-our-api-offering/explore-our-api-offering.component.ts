import { Component, Input } from '@angular/core';

/**
 * This class represents the LandingBannerComponent.
 */
@Component({
  selector: 'app-sd-explore-our-api-offering',
  templateUrl: 'explore-our-api-offering.component.html',
  styleUrls: ['explore-our-api-offering.component.scss']
})
export class ExploreOurAPIOfferingComponent {
  @Input() dataList: any[] = null;
}
