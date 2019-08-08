import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './login.routes';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    LoginFormComponent,
    DefaultPageComponent,
  ]
})
export class LoginModule { }
