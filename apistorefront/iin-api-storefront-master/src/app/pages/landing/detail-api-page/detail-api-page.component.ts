import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded DetailAPIPageComponent.
 */
@Component({
  selector: 'app-sd-detail-api-page',
  templateUrl: 'detail-api-page.component.html',
  styleUrls: ['detail-api-page.component.scss']
})
export class DetailAPIPageComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;
  dataListDropdown: any[] = null;
  dataListShown: any[] = null;

  currentTab = 'Description'; // 'Description','Key Features/Benefits','API Specification','Pricing'

  detailId = 0;
  private sub: any;

  /**
   * Creates an instance of the DetailAPIPageComponent with the injected
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

    this.getDataList('dataDetailAPI.json');

    this.getDropdownDataList('dataDropdownOptions.json');
  }

  initData() {
    console.log(this.dataList);
    this.dataListShown = this.dataList[this.detailId];
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
  getDropdownDataList(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataListDropdown = dataList,
        error => this.errorMessage = error as any
      );
  }
}
