import { Routes } from '@angular/router';

import { DefaultPageComponent } from './default-page/default-page.component';
import { MoreAPIPageComponent } from './more-api-page/more-api-page.component';
import { DetailAPIPageComponent } from './detail-api-page/detail-api-page.component';
import { SupportPageComponent } from './support-page/support-page.component';

export const routes: Routes = [
  { path: '', component: DefaultPageComponent},
  { path: 'more-api-page', component: MoreAPIPageComponent},
  { path: 'detail-api-page/:apiId', component: DetailAPIPageComponent},
  { path: 'support-page', component: SupportPageComponent},
];
