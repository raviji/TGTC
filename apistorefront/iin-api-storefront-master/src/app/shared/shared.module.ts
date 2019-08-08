import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { HeaderNonLoginComponent } from './components/header-non-login/header-non-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';
import { FooterNonLoginComponent } from './components/footer-non-login/footer-non-login.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { APIBoxComponent } from './components/api-box/api-box.component';
import { ListMoreAPIComponent } from './components/list-more-api/list-more-api.component';
import { DetailTabDescriptionComponent } from './components/detail-tab-description/detail-tab-description.component';
import { DetailTabKeyFeaturesComponent } from './components/detail-tab-key-features/detail-tab-key-features.component';
import { DetailTabAPISpecificationComponent } from './components/detail-tab-api-specification/detail-tab-api-specification.component';
import { DetailTabPricingComponent } from './components/detail-tab-pricing/detail-tab-pricing.component';
import { AddManageApiAddImageComponent } from './components/add-manage-api-add-image/add-manage-api-add-image.component';
import { AddManageApiAddBaseUrlComponent } from './components/add-manage-api-add-base-url/add-manage-api-add-base-url.component';
import { AddManageApiAddEndpointsComponent } from './components/add-manage-api-add-endpoints/add-manage-api-add-endpoints.component';
import { AddApiMakePublicComponent } from './components/add-api-make-public/add-api-make-public.component';
import { ManageApiPlansPricingComponent } from './components/manage-api-plans-pricing/manage-api-plans-pricing.component';
import { ManageApiDocsComponent } from './components/manage-api-docs/manage-api-docs.component';
import { ModalWindowsComponent } from './components/modal-windows/modal-windows.component';
import { LineChartDoubleBiggerComponent } from './components/line-chart-double-bigger/line-chart-double-bigger.component';
import { LineChartDoubleComponent } from './components/line-chart-double/line-chart-double.component';
import { DoubleBarChartComponent } from './components/double-bar-chart/double-bar-chart.component';
import { ScrollTrackerDirective } from './scrollTracker.directive';
import { QuillModule } from 'ngx-quill';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    ClickOutsideModule,
    QuillModule.forRoot()
  ],
  declarations: [
    HeaderLoginComponent,
    HeaderNonLoginComponent,
    FooterLoginComponent,
    FooterNonLoginComponent,
    LeftSidebarComponent,
    APIBoxComponent,
    ListMoreAPIComponent,
    DetailTabDescriptionComponent,
    DetailTabKeyFeaturesComponent,
    DetailTabAPISpecificationComponent,
    DetailTabPricingComponent,
    AddManageApiAddImageComponent,
    AddManageApiAddBaseUrlComponent,
    AddManageApiAddEndpointsComponent,
    AddApiMakePublicComponent,
    ManageApiPlansPricingComponent,
    ManageApiDocsComponent,
    ModalWindowsComponent,
    LineChartDoubleBiggerComponent,
    LineChartDoubleComponent,
    DoubleBarChartComponent,
    ScrollTrackerDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderLoginComponent,
    HeaderNonLoginComponent,
    FooterLoginComponent,
    FooterNonLoginComponent,
    LeftSidebarComponent,
    APIBoxComponent,
    ListMoreAPIComponent,
    DetailTabDescriptionComponent,
    DetailTabKeyFeaturesComponent,
    DetailTabAPISpecificationComponent,
    DetailTabPricingComponent,
    AddManageApiAddImageComponent,
    AddManageApiAddBaseUrlComponent,
    AddManageApiAddEndpointsComponent,
    AddApiMakePublicComponent,
    ManageApiPlansPricingComponent,
    ManageApiDocsComponent,
    ModalWindowsComponent,
    LineChartDoubleBiggerComponent,
    LineChartDoubleComponent,
    DoubleBarChartComponent,
    ScrollTrackerDirective,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
