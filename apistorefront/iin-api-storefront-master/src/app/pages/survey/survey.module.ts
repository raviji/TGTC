import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { routes } from './survey.routes';

import { LeftStepsComponent } from './components/left-steps/left-steps.component';
import { RightQuestionComponent } from './components/right-question/right-question.component';
import { ThankYouFormComponent } from './components/thank-you-form/thank-you-form.component';
import { DefaultPageComponent } from './default-page/default-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    LeftStepsComponent,
    RightQuestionComponent,
    ThankYouFormComponent,
    DefaultPageComponent,
  ]
})
export class SurveyModule { }
