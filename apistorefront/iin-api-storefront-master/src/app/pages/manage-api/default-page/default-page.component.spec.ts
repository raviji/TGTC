import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of, Subject, throwError } from 'rxjs';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { DefaultPageComponent } from './default-page.component';

class ActivatedRouteStub {
    private subject = new Subject();

    push(value) {
        this.subject.next(value);
    }

    get params() {
        return this.subject.asObservable();
    }
}

describe('manage-api/DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;
    let dataListService: DataListService;
    let cookie: CookieService;
    let router: Router;

    let mockDataList: any;
    let mockDataListDropdown: any;
    let mockApiList: {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                DefaultPageComponent
            ],
            providers: [
                DataListService,
                CookieService,
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPageComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);
        cookie = TestBed.get(CookieService);
        router = TestBed.get(Router);

        mockDataList = {
            Overview: {
                apiName: 'TestApiName',
            }
        };

        mockDataListDropdown = {
            category: [
                {
                    option: 'Category 1'
                },
                {
                    option: 'Category 2'
                }
            ]
        };

        mockApiList = [
            {
                apiName: 'Api Name 1',
            },
            {
                apiName: 'Api Name 2',
            }
        ];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update currentTab when changeTab is clicked', () => {
        const testTab = 'Test Tab';

        expect(component.currentTab).toBe('Overview');
        component.changeTab(testTab);

        expect(component.currentTab).toBe(testTab);
    });

    it('should not update apiName when route is changed and param is undefined', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ myAPIId: undefined });
        tick();

        expect(component.apiName).toBe('');
    }));

    it('should update apiName when route is changed and param is valid', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ myAPIId: 1 });
        tick();

        expect(component.apiName).toBe(mockApiList[1]['apiName']);
    }));

    it('should update API in existing myAPIList cookie and navigate to dashboard', () => {

        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        spyOn(cookie, 'set');
        spyOn(router, 'navigate');

        component.detailId = 1;
        component.clickUpdate('New Api Name');
        expect(cookie.set).toHaveBeenCalledWith('myAPIList', '[{"apiName":"Api Name 1"},{"apiName":"New Api Name"}]', null, '/');
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should delete API from existing myAPIList cookie and navigate to dashboard', () => {

        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        spyOn(cookie, 'set');
        spyOn(router, 'navigate');

        component.clickDeleteAPI('');
        expect(cookie.set).toHaveBeenCalledWith('myAPIList', '[{"apiName":"Api Name 2"}]', null, '/');
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should get dataList from service and update datalist apiName', () => {
        component.apiName = 'NewApiName';

        spyOn(dataListService, 'get').and.returnValue(of(mockDataList));
        component.getDataList('dummyUrl');

        expect(component.dataList).toEqual(mockDataList);
        expect(component.dataList['Overview']['apiName']).toBe('NewApiName');
    });

    it('should handle error from dataListService when trying to get dataList', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        component.getDataList('dummyUrl');

        expect(component.dataList).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });

    it('should get dataList dropdown from service', () => {
        spyOn(dataListService, 'get').and.returnValue(of(mockDataListDropdown));
        component.getDropdownDataList('dummyUrl');

        expect(component.dataListDropdown).toEqual(mockDataListDropdown);
    });

    it('should handle error from dataListService when trying to get dataList dropdown', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        component.getDropdownDataList('dummyUrl');

        expect(component.dataListDropdown).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });
});
