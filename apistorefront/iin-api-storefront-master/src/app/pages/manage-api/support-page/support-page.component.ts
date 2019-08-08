import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded DefaultPageComponent.
 */
@Component({
  selector: 'app-sd-support-page',
  templateUrl: 'support-page.component.html',
  styleUrls: ['support-page.component.scss']
})
export class SupportPageComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;

  currentTab = 'Inbox'; // 'Inbox','Unread','Starred','Sent','Archived'

  /**
   * Creates an instance of the SupportPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataList('dataManageAPISupport.json');
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
