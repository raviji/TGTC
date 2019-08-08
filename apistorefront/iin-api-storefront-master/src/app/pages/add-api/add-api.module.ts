import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './add-api.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddNewApiFormComponent } from './components/add-new-api-form/add-new-api-form.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
  ],
  declarations: [
    AddNewApiFormComponent,
    DefaultPageComponent,
  ]
})
export class AddApiModule { }
