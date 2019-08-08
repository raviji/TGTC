import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataListService } from '../../../shared/services/data-list.service';

/**
 * This class represents the lazy loaded MoreAPIPageComponent.
 */
@Component({
  selector: 'app-sd-support-page',
  templateUrl: 'support-page.component.html',
  styleUrls: ['support-page.component.scss']
})
export class SupportPageComponent implements OnInit {
  errorMessage: string;
  dataList: any[] = null;

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
  }
}
