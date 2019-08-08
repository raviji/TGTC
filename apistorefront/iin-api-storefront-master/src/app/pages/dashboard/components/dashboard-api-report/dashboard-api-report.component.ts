import { Component, Input, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

/**
 * This class represents the ManageApiAnalyticsComponent.
 */
@Component({
  selector: 'app-sd-dashboard-api-report',
  templateUrl: 'dashboard-api-report.component.html',
  styleUrls: ['dashboard-api-report.component.scss']
})
export class DashboardAPIReportComponent implements OnInit {
  @Input() dataListInitial: any[];
  @Input() dataListAnotherVersion: any[];
  @Input() detailId = -1;

  dataList: any[];
  showInitial = true;

  showCalendar = false;
  fromDateString = '';
  toDateString = '';

  showAndriodFilter = true;
  showPaymentFilter = true;

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(public calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();

    this.fromDate['day'] = 3;
    this.fromDate['month'] = 1;
    this.fromDate['year'] = 2019;

    this.toDate['day'] = 10;
    this.toDate['month'] = 6;
    this.toDate['year'] = 2019;

    this.updateDateString();
  }

  /**
   * OnInit
   */
  ngOnInit() {
    console.log(this.dataList);
    this.dataList = this.dataListInitial[this.detailId];
  }

  // delete Filter
  deleteFilter(filterName) {
    switch (filterName) {
      case 'Andriod':
        this.showAndriodFilter = false;
        break;
      case 'Payment':
        this.showPaymentFilter = false;
        break;
    }
  }

  // change Data
  changeData() {
    if (!this.showCalendar) {
      if (this.showInitial) {
        this.dataList = this.dataListAnotherVersion[this.detailId];
      } else {
        this.dataList = this.dataListInitial[this.detailId];
      }
      this.showInitial = !this.showInitial;
    }
  }

  // click Outside
  clickOutdie() {
    if (this.showCalendar) {
      this.showCalendar = false;
      this.changeData();
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.updateDateString();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  // update date string
  updateDateString() {
    if (this.fromDate) {
      this.fromDateString = this.fromDate['day'] + ' '
                          + this.convertMonthText(this.fromDate['month'])
                          + ' ' + this.fromDate['year'];
    }

    if (this.toDate) {
      this.toDateString = this.toDate['day'] + ' '
                        + this.convertMonthText(this.toDate['month']) + ' '
                        + this.toDate['year'];
    }
  }

  // convert month text
  convertMonthText(month) {
    let monthText = '';
    switch (month) {
      case 1:
        monthText = 'Jan';
        break;
      case 2:
        monthText = 'Feb';
        break;
      case 3:
        monthText = 'Mar';
        break;
      case 4:
        monthText = 'Apr';
        break;
      case 5:
        monthText = 'May';
        break;
      case 6:
        monthText = 'Jun';
        break;
      case 7:
        monthText = 'Jul';
        break;
      case 8:
        monthText = 'Aug';
        break;
      case 9:
        monthText = 'Sep';
        break;
      case 10:
        monthText = 'Oct';
        break;
      case 11:
        monthText = 'Nov';
        break;
      case 12:
        monthText = 'Dec';
        break;
    }
    return monthText;
  }
}
