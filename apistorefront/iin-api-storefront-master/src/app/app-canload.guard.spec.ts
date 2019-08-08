import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { CanShowPage } from './app-canload.guard';
import { DataListService } from './shared/services/data-list.service';


describe('CanShowPage', () => {
  let guard: CanShowPage;
  let dataListService: DataListService;
  let route: Router;

  const snapshot = {
    routeConfig: { path: 'test' },
    url: null,
    params: null,
    queryParams: null,
    fragment: null,
    data: null,
    outlet: null,
    component: null,
    root: null,
    parent: null,
    firstChild: null,
    children: null,
    pathFromRoot: null,
    paramMap: null,
    queryParamMap: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CanShowPage,
        DataListService,
        CookieService
      ]
    });

    guard = TestBed.get(CanShowPage);
    dataListService = TestBed.get(DataListService);
    route = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not load when not authenticated', doneCallback => {
    spyOn(dataListService, 'check').and.returnValue(of({ success: false }));
    spyOn(route, 'navigate');

    (guard.canLoad({ path: '/test' }) as Observable<boolean>).subscribe(actual => {
      expect(actual).toBe(false);
      expect(route.navigate).toHaveBeenCalledWith(['/login']);
      doneCallback();
    });
  });

  it('should load when authenticated', doneCallback => {
    spyOn(dataListService, 'check').and.returnValue(of({ success: true }));
    spyOn(route, 'navigate');

    (guard.canLoad({ path: '/test' }) as Observable<boolean>).subscribe(actual => {
      expect(actual).toBe(true);
      expect(route.navigate).toHaveBeenCalledTimes(0);
      doneCallback();
    });
  });

  it('should not activate when not authenticated', doneCallback => {
    spyOn(dataListService, 'check').and.returnValue(of({ success: false }));
    spyOn(route, 'navigate');

    (guard.canActivate(snapshot, null) as Observable<boolean>).subscribe(actual => {
      expect(actual).toBe(false);
      expect(route.navigate).toHaveBeenCalledWith(['/login']);
      doneCallback();
    });
  });

  it('should activate when authenticated', doneCallback => {
    spyOn(dataListService, 'check').and.returnValue(of({ success: true }));
    spyOn(route, 'navigate');

    (guard.canActivate(snapshot, null) as Observable<boolean>).subscribe(actual => {
      expect(actual).toBe(true);
      expect(route.navigate).toHaveBeenCalledTimes(0);
      doneCallback();
    });
  });
});
