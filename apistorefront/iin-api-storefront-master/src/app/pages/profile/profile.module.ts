import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './profile.routes';

import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ProfileFormComponent,
    DefaultPageComponent,
  ]
})
export class ProfileModule { }
