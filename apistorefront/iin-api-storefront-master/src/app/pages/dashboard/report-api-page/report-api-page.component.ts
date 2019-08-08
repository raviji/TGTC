import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded ReportAPIPageComponent.
 */
@Component({
  selector: 'app-sd-report-api-page',
  templateUrl: 'report-api-page.component.html',
  styleUrls: ['report-api-page.component.scss']
})
export class ReportAPIPageComponent implements OnInit {
  errorMessage: string;
  dataListInitial: any[] = null;
  dataListAnotherVersion: any[] = null;
  dataListShown: any[] = null;

  detailId = -1;
  private sub: any;

  /**
   * Creates an instance of the ReportAPIPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['apiId'] !== undefined) {
        this.detailId = parseInt(params['apiId'], 10);
      }
    });

    this.getDataListInitial('dataReportAPIAnalyticsInitial.json');

    this.getDataListAnotherVersion('dataReportAPIAnalyticsAnotherVersion.json');
  }

  initData() {
    console.log(this.dataListInitial);
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
