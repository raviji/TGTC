import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './forgot-password.routes';

import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ForgotPasswordFormComponent,
    DefaultPageComponent,
  ]
})
export class ForgotPasswordModule { }
