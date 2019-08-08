import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './dashboard.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { DashboardBannerComponent } from './components/dashboard-banner/dashboard-banner.component';
import { DashboardSubscribedApiComponent } from './components/dashboard-subscribed-api/dashboard-subscribed-api.component';
import { DashboardRecommendedApiComponent } from './components/dashboard-recommended-api/dashboard-recommended-api.component';
import { DashboardAPIReportComponent } from './components/dashboard-api-report/dashboard-api-report.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { MoreAPIPageComponent } from './more-api-page/more-api-page.component';
import { DetailAPIPageComponent } from './detail-api-page/detail-api-page.component';
import { ReportAPIPageComponent } from './report-api-page/report-api-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    ClickOutsideModule,
  ],
  declarations: [
    DashboardBannerComponent,
    DashboardSubscribedApiComponent,
    DashboardRecommendedApiComponent,
    DashboardAPIReportComponent,
    DefaultPageComponent,
    MoreAPIPageComponent,
    DetailAPIPageComponent,
    ReportAPIPageComponent,
  ]
})
export class DashboardModule { }
