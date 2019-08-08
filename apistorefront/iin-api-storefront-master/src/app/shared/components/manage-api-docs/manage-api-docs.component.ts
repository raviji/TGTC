import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the ManageApiDocsComponent.
 */
@Component({
  selector: 'app-sd-manage-api-docs',
  templateUrl: 'manage-api-docs.component.html',
  styleUrls: ['manage-api-docs.component.scss']
})
export class ManageApiDocsComponent {
  @Input() dataList: any[];

  @Output() clickUpdate: EventEmitter<string> = new EventEmitter();

  submitted = false;

  uploadedFile = '';

  // select File
  selectFile(event) {
    const files = event.srcElement.files;
    this.uploadedFile = files[0]['name'];
  }

  // click Update
  update() {
    this.submitted = true;

    if (this.dataList['Brief Description'] !== ''
     && this.dataList['Documentation'] !== '') {
      this.clickUpdate.emit();
    }
  }
}
