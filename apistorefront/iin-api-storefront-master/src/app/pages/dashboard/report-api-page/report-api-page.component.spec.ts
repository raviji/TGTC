import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReportAPIPageComponent } from './report-api-page.component';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteStub {
    private subject = new Subject();

    push(value) {
        this.subject.next(value);
    }

    get params() {
        return this.subject.asObservable();
    }
}

describe('ReportAPIPageComponent', () => {
    let component: ReportAPIPageComponent;
    let fixture: ComponentFixture<ReportAPIPageComponent>;
    let dataListService: DataListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                ReportAPIPageComponent
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
        fixture = TestBed.createComponent(ReportAPIPageComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);

        component.detailId = 0;
        component.dataListInitial = [
            {
                title: 'title 1'
            },
            {
                title: 'title 2'
            }
        ];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not update apiName when route is changed and param is undefined', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ apiId: undefined });
        tick();

        expect(component.detailId).toBe(0);
    }));

    it('should update apiName when route is changed and param is valid', fakeAsync(() => {
        fixture.detectChanges();

        spyOn(dataListService, 'get').and.returnValue(throwError('')); // dummy call

        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ apiId: 1 });
        tick();

        expect(component.detailId).toBe(1);
    }));

    it('should get initial dataList from service', () => {
        const testDataList = [
            {
                title: 'title 3'
            },
            {
                title: 'title 4'
            }
        ];

        spyOn(dataListService, 'get').and.returnValue(of(testDataList));
        fixture.detectChanges();

        expect(component.dataListInitial).toEqual(testDataList);
    });

    it('should handle error from dataListService when trying to get initial dataList', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        fixture.detectChanges();

        expect(component.errorMessage).toBe(testError);
    });

    it('should get another dataList from service', () => {
        const testDataList = [
            {
                title: 'title 5'
            },
            {
                title: 'title 6'
            }
        ];

        spyOn(dataListService, 'get').and.returnValue(of(testDataList));
        fixture.detectChanges();

        expect(component.dataListAnotherVersion).toEqual(testDataList);
    });

    it('should handle error from dataListService when trying to get another dataList', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        fixture.detectChanges();

        expect(component.dataListAnotherVersion).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });
});
