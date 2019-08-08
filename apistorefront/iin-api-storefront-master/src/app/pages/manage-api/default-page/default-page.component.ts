import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  dataListDropdown: any[] = null;

  currentTab = 'Overview'; // 'Overview','Settings','Endpoints','Plans & Pricing','Docs'

  detailId = 0;
  apiName = '';
  private sub: any;

  /**
   * Creates an instance of the DefaultPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['myAPIId'] !== undefined) {
        this.detailId = parseInt(params['myAPIId'], 10);

        const myAPIList = JSON.parse(this.cookieService.get('myAPIList'));
        this.apiName = myAPIList[this.detailId]['apiName'];
        console.log(this.apiName);
      }
    });

    this.getDataList('dataManageAPIDefinition.json');

    this.getDropdownDataList('dataDropdownOptions.json');
  }

  initData() {
    console.log(this.dataList);
    this.dataList['Overview']['apiName'] = this.apiName;
  }

  // change Tab
  changeTab(event) {
    this.currentTab = event;
  }

  // click Update
  clickUpdate(event) {
    console.log('clickUpdate');
    const myAPIList = JSON.parse(this.cookieService.get('myAPIList'));
    myAPIList[this.detailId]['apiName'] = event;

    this.cookieService.set('myAPIList', JSON.stringify(myAPIList), null, '/');
    this.router.navigate(['/dashboard']);
  }

  // click Delete API
  clickDeleteAPI(event) {
    console.log('clickDeleteAPI');
    const myAPIList = JSON.parse(this.cookieService.get('myAPIList'));
    myAPIList.splice(this.detailId, 1);

    this.cookieService.set('myAPIList', JSON.stringify(myAPIList), null, '/');
    this.router.navigate(['/dashboard']);
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
