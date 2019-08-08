import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded DefaultPageComponent.
 */
@Component({
  selector: 'app-sd-analytics-page',
  templateUrl: 'analytics-page.component.html',
  styleUrls: ['analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {
  errorMessage: string;
  dataListInitial: any[] = null;
  dataListAnotherVersion: any[] = null;

  /**
   * Creates an instance of the AnalyticsPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataListInitial('dataManageAPIAnalyticsInitial.json');

    this.getDataListAnotherVersion('dataManageAPIAnalyticsAnotherVersion.json');
  }

  initData() {
    console.log(this.dataListInitial);
    console.log(this.dataListAnotherVersion);
  }

  /**
   * Handle the dataListService observable
   */
  getDataListInitial(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataListInitial = dataList,
        error => this.errorMessage = error as any,
        () => this.initData()
      );
  }

  getDataListAnotherVersion(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataListAnotherVersion = dataList,
        error => this.errorMessage = error as any,
        () => this.initData()
      );
  }
}
