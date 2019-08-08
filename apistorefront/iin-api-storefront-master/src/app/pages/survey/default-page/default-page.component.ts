import { Component, OnInit } from '@angular/core';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded DefaultPageComponent.
 */
@Component({
  selector: 'app-sd-default-page',
  templateUrl: 'default-page.component.html',
  styleUrls: ['default-page.component.scss']
})
export class DefaultPageComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;

  showThankYou = false;

  currentIndex = 0;

  /**
   * Creates an instance of the DefaultPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataList('dataSurvey.json');
  }

  initData() {
    console.log(this.dataList);
  }

  // click Next
  clickNext(event) {
    if (this.dataList['Survey'].length > (this.currentIndex + 1)) {
      this.currentIndex++;
    } else {
      this.showThankYou = true;
    }
  }

  /**
   * Handle the dataListService observable
   */
  getDataList(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataList = dataList,
        error => this.errorMessage = error as any,
        () => this.initData()
      );
  }
}
