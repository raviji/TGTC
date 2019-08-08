import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './landing.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';
import { ExploreOurAPIOfferingComponent } from './components/explore-our-api-offering/explore-our-api-offering.component';
import { BuildForDevelopersComponent } from './components/build-for-developers/build-for-developers.component';
import { TrustedByTheLargestCompanyComponent } from './components/trusted-by-the-largest-company/trusted-by-the-largest-company.component';
import { NewsAndEventComponent } from './components/news-and-event/news-and-event.component';
import { VideosHelpComponent } from './components/videos-help/videos-help.component';
import { FAQsComponent } from './components/faqs/faqs.component';
import { DocumentationsComponent } from './components/documentations/documentations.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

import { DefaultPageComponent } from './default-page/default-page.component';
import { MoreAPIPageComponent } from './more-api-page/more-api-page.component';
import { DetailAPIPageComponent } from './detail-api-page/detail-api-page.component';
import { SupportPageComponent } from './support-page/support-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    ClickOutsideModule,
  ],
  declarations: [
    LandingBannerComponent,
    ExploreOurAPIOfferingComponent,
    BuildForDevelopersComponent,
    TrustedByTheLargestCompanyComponent,
    NewsAndEventComponent,
    VideosHelpComponent,
    FAQsComponent,
    DocumentationsComponent,
    ContactUsComponent,

    DefaultPageComponent,
    MoreAPIPageComponent,
    DetailAPIPageComponent,
    SupportPageComponent,
  ]
})
export class LandingModule { }
