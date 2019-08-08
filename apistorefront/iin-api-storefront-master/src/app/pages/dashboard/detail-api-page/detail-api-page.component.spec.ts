import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DetailAPIPageComponent } from './detail-api-page.component';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, throwError, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


class ActivatedRouteStub {
    private subject = new Subject();

    push(value) {
        this.subject.next(value);
    }

    get params() {
        return this.subject.asObservable();
    }
}

describe('dashboard/DetailAPIPageComponent', () => {
    let component: DetailAPIPageComponent;
    let fixture: ComponentFixture<DetailAPIPageComponent>;
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
                DetailAPIPageComponent
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
        fixture = TestBed.createComponent(DetailAPIPageComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);
        cookie = TestBed.get(CookieService);
        router = TestBed.get(Router);

        component.detailId = 0;

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


    it('should not update detailId when route is changed and param is undefined', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ apiId: undefined });
        tick();

        expect(component.detailId).toBe(0);
    }));

    it('should update detailId when route is changed and param is valid', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ apiId: 1 });
        tick();

        expect(component.detailId).toBe(1);
    }));

    it('should get dataList from service', () => {

        spyOn(dataListService, 'get').and.returnValue(of(mockDataList));
        component.getDataList('dummyUrl');

        expect(component.dataList).toEqual(mockDataList);
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
