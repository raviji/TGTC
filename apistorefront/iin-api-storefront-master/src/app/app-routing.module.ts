import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanShowPage } from './app-canload.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'survey',
    loadChildren: './pages/survey/survey.module#SurveyModule'
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingModule'
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canLoad: [CanShowPage]
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule',
    canLoad: [CanShowPage]
  },
  {
    path: 'add-api',
    loadChildren: './pages/add-api/add-api.module#AddApiModule',
    canLoad: [CanShowPage]
  },
  {
    path: 'manage-api',
    loadChildren: './pages/manage-api/manage-api.module#ManageApiModule',
    canLoad: [CanShowPage]
  },
  {
    path: 'index',
    loadChildren: './pages/index/index.module#IndexModule'
  },
  { path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
