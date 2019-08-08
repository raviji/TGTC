import { Routes } from '@angular/router';

import { DefaultPageComponent } from './default-page/default-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { SupportPageComponent } from './support-page/support-page.component';

export const routes: Routes = [
  { path: 'default-page/:myAPIId', component: DefaultPageComponent},
  { path: 'analytics-page/:myAPIId', component: AnalyticsPageComponent},
  { path: 'support-page/:myAPIId', component: SupportPageComponent},
];
