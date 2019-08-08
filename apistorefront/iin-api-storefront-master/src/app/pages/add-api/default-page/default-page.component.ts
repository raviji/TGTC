import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  dataListDropdown: any[] = null;

  addedAPI = false;
  addAPIFormData = {
    imgUrl: '',
    categories: '',
    apiName: '',
    website: '',
    shortDescription: '',
    longDescription: '',
    termOfUse: ''
  };
  currentStepIndex = 0; // values: 0,1,2,3,4,5

  /**
   * Creates an instance of the DefaultPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private cookieService: CookieService) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataList('dataDropdownOptions.json');
  }

  initData() {
    console.log(this.dataListDropdown);
  }

  // click Add API
  clickAddAPI(event) {
    console.log(this.addAPIFormData);
    this.addedAPI = true;
    this.currentStepIndex++;
  }

  // click Previous
  clickPrevious(event) {
    this.currentStepIndex--;
  }

  // click Next
  clickNext(event) {
    this.currentStepIndex++;
  }

  // click Delete API
  clickDeleteAPI(event) {
    this.router.navigate(['/dashboard']);
  }

  // showMyAPI
  showMyAPI() {
    const myAPIList = JSON.parse(this.cookieService.get('myAPIList'));
    myAPIList.push({
      apiName: this.addAPIFormData['apiName'],
      expanded: false
    });

    this.cookieService.set('myAPIList', JSON.stringify(myAPIList), null, '/');
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handle the dataListService observable
   */
  getDataList(jsonUrl) {
    this.dataListService.get(jsonUrl)
      .subscribe(
        dataList => this.dataListDropdown = dataList,
        error => this.errorMessage = error as any,
        () => this.initData()
      );
  }
}
