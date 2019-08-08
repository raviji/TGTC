import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './index.routes';

import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    DefaultPageComponent,
  ]
})
export class IndexModule { }
