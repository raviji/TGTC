import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './manage-api.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { ManageApiBannerComponent } from './components/manage-api-banner/manage-api-banner.component';
import { ManageApiAnalyticsComponent } from './components/manage-api-analytics/manage-api-analytics.component';
import { ManageApiSupportComponent } from './components/manage-api-support/manage-api-support.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
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
    ManageApiBannerComponent,
    ManageApiAnalyticsComponent,
    ManageApiSupportComponent,
    DefaultPageComponent,
    AnalyticsPageComponent,
    SupportPageComponent,
  ]
})
export class ManageApiModule { }
