import { Component, Input } from '@angular/core';

/**
 * This class represents the LandingBannerComponent.
 */
@Component({
  selector: 'app-sd-build-for-developers',
  templateUrl: 'build-for-developers.component.html',
  styleUrls: ['build-for-developers.component.scss']
})
export class BuildForDevelopersComponent {
  currentProgress = 'Create User Authentication'; /* 'Create User Authentication','Customer Transaction',
                                                     'Email Marketing Blast','Pay a Bill','Misscall OTP' */
  currentTab = 'Swift'; // 'Swift','Objective-C','Java','C++','Unity'
}
