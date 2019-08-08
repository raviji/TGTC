import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded MoreAPIPageComponent.
 */
@Component({
  selector: 'app-sd-more-api-page',
  templateUrl: 'more-api-page.component.html',
  styleUrls: ['more-api-page.component.scss']
})
export class MoreAPIPageComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;

  searchText = '';
  showLoadMore = false;
  hasShownLoadMore = false;

  isLoggedIn = false;

  /**
   * Creates an instance of the MoreAPIPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.getDataList('dataDashboardMoreAPI.json');
  }

  initData() {
    console.log(this.dataList);
  }

  // scroll the page
  updateScrollPos(e) {
    if (e.endReached && !this.hasShownLoadMore) {
      this.showLoadMore = true;
      this.hasShownLoadMore = true;
      setTimeout(() => this.showLoadMore = false, 3000);
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
