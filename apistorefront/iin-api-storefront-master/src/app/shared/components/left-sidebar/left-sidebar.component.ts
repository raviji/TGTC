import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * This class represents the LeftSidebarComponent.
 */
@Component({
  selector: 'app-sd-left-sidebar',
  templateUrl: 'left-sidebar.component.html',
  styleUrls: ['left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
  @Input() pageType = '';

  userRole = '';
  myAPIList = null;

  detailId = -1;
  private sub: any;

  /**
   * Creates an instance of the LeftSidebarComponent
   */
  constructor(private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['myAPIId'] !== undefined) {
        this.detailId = parseInt(params['myAPIId'], 10);
      }
    });
    console.log(this.detailId);
    this.userRole = this.cookieService.get('role');
    this.myAPIList = JSON.parse(this.cookieService.get('myAPIList'));

    if ((this.detailId !== -1) && (this.userRole !== 'user')) {
      this.myAPIList[this.detailId]['expanded'] = true;
    }
  }

  // click Definition Link
  clickDefinitionLink(id) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/manage-api/default-page/' + id])
    );
  }

  // click Analytics Link
  clickAnalyticsLink(id) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/manage-api/analytics-page/' + id])
    );
  }

  // click Support Link
  clickSupportLink(id) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/manage-api/support-page/' + id])
    );
  }
}
