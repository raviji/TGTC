import { Component, Input } from '@angular/core';

/**
 * This class represents the RightQuestionComponent.
 */
@Component({
  selector: 'app-sd-right-question',
  templateUrl: 'right-question.component.html',
  styleUrls: ['right-question.component.scss']
})
export class RightQuestionComponent {
  @Input() dataList: any[];
  @Input() currentIndex = 0;
}
