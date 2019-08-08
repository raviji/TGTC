import { Component, OnInit, OnChanges, Input } from '@angular/core';

/**
 * This class represents the ListMoreAPIComponent.
 */
@Component({
  selector: 'app-sd-list-more-api',
  templateUrl: 'list-more-api.component.html',
  styleUrls: ['list-more-api.component.scss']
})
export class ListMoreAPIComponent implements OnInit, OnChanges {
  @Input() dataList: any[];
  @Input() searchText = '';
  @Input() showLoadMore = false;
  @Input() isLoggedIn = true;

  activeView = 'Grid'; // values: 'Grid','List'

  dataListShown: any[];
  filterData = {
    categoryAll: true,
    category: [
      {
        label: 'Banking',
        checked: false
      },
      {
        label: 'Blockchain',
        checked: false
      },
      {
        label: 'Finance',
        checked: false
      },
      {
        label: 'Security',
        checked: false
      },
      {
        label: 'Trading',
        checked: false
      },
      {
        label: 'Payments',
        checked: false
      },
      {
        label: 'Accounting',
        checked: false
      }
    ],
    pricingAll: true,
    pricing: [
      {
        label: 'Paid',
        checked: false
      },
      {
        label: 'Free',
        checked: false
      }
    ],
    sort: [
      {
        label: 'Popular',
        checked: false
      },
      {
        label: 'Downloaded',
        checked: false
      },
      {
        label: 'High Rating',
        checked: false
      }
    ]
  };

  /**
   * OnInit
   */
  ngOnInit() {
    this.dataListShown = this.dataList;
  }

  /**
   * OnChanges
   */
  ngOnChanges() {
    this.updateFilter();
  }

  // update Filter
  updateFilter() {
    this.dataListShown = [];

    this.dataList.forEach((item, index) => {
      let isMtachedCategory = false;
      let isMtachedPricing = false;
      let isMtachedSeaching = false;

      // filter for category
      if (this.filterData['categoryAll']) {
        isMtachedCategory = true;
      } else {
        let matchedTag = false;
        item['tagList'].forEach((tagItem, tagIndex) => {
          this.filterData['category'].forEach((categoryItem, categoryIndex) => {
            if (categoryItem['checked'] && (tagItem['name'] === categoryItem['label'])) {
              matchedTag = true;
            }
          });
        });

        if (matchedTag) {
          isMtachedCategory = true;
        }
      }

      // filter for pricing
      if (this.filterData['pricingAll']) {
        isMtachedPricing = true;
      } else {
        let matchedTag = false;
        this.filterData['pricing'].forEach((categoryItem, categoryIndex) => {
          if (categoryItem['checked'] && (item['pricing'] === categoryItem['label'])) {
            matchedTag = true;
          }
        });

        if (matchedTag) {
          isMtachedPricing = true;
        }
      }

      // searching
      if (this.searchText.trim() === '') {
        isMtachedSeaching = true;
      } else {
        if (item['title'].toLowerCase().indexOf(this.searchText.trim().toLowerCase()) > -1) {
          isMtachedSeaching = true;
        }
      }

      if (isMtachedCategory && isMtachedPricing && isMtachedSeaching) {
        this.dataListShown.push(item);
      }
    });

    // sorting
    this.filterData['sort'].forEach((item, index) => {
      if (item['checked']) {
        this.dataListShown.sort((a, b) => b[item['label'].toString()] - a[item['label'].toString()]);
      }
    });
  }

  // change All Category
  changeAllCategory() {
    if (this.filterData['categoryAll']) {
      this.filterData['category'].forEach((item, index) => {
        item['checked'] = false;
      });
    }

    this.updateFilter();
  }

  // change Sub Category
  changeSubCategory() {
    let hasSubChecked = false;
    this.filterData['category'].forEach((item, index) => {
      if (item['checked']) {
        hasSubChecked = true;
      }
    });

    if (hasSubChecked) {
      this.filterData['categoryAll'] = false;
    }

    this.updateFilter();
  }

  // change All Pricing
  changeAllPricing() {
    if (this.filterData['pricingAll']) {
      this.filterData['pricing'].forEach((item, index) => {
        item['checked'] = false;
      });
    }

    this.updateFilter();
  }

  // change Sub Pricing
  changeSubPricing() {
    let hasSubChecked = false;
    this.filterData['pricing'].forEach((item, index) => {
      if (item['checked']) {
        hasSubChecked = true;
      }
    });

    if (hasSubChecked) {
      this.filterData['pricingAll'] = false;
    }

    this.updateFilter();
  }

  // change Sort
  changeSort(index) {
    if (this.filterData['sort'][index]['checked']) {
      this.filterData['sort'].forEach((sortItem, sortIndex) => {
        if (index !== sortIndex) {
          sortItem['checked'] = false;
        }
      });
    }

    this.updateFilter();
  }
}
