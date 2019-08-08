import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  currentTab = 'Subscribed API'; // 'Subscribed API','Recommended API'

  /**
   * Creates an instance of the DefaultPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataList('dataDashboard.json');
  }

  initData() {
    console.log(this.dataList);
  }

  // change Tab
  changeTab(event) {
    this.currentTab = event;
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
