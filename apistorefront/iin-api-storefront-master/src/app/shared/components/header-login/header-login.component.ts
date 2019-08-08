import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { DataListService } from '../../services/data-list.service';

/**
 * This class represents the HeaderComponent.
 */
@Component({
  selector: 'app-sd-header-login',
  templateUrl: 'header-login.component.html',
  styleUrls: ['header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;

  userName = '';
  showNotification = false;

  /**
   * Creates an instance of the HeaderLoginComponent
   */
  constructor(
      private router: Router,
      private service: DataListService,
      private cookieService: CookieService
    ) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.userName = this.cookieService.get('userName');
    console.log(this.userName);

    this.getDataList('dataNotifications.json');
  }

  initData() {
    console.log(this.dataList);
  }

  // click Logout
  clickLogout() {
    this.service.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  /**
   * Handle the dataListService observable
   */
  getDataList(jsonUrl) {
    this.service.get(jsonUrl)
      .subscribe(
        dataList => this.dataList = dataList,
        error => this.errorMessage = error as any,
        () => this.initData()
      );
  }
}
