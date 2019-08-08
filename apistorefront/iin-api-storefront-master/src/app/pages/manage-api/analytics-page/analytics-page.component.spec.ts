import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { AnalyticsPageComponent } from './analytics-page.component';


describe('AnalyticsPageComponent', () => {
    let component: AnalyticsPageComponent;
    let fixture: ComponentFixture<AnalyticsPageComponent>;
    let dataListService: DataListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                AnalyticsPageComponent
            ],
            providers: [
                DataListService,
                CookieService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnalyticsPageComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get initial dataList from service', () => {
        const testDataList = ['Test Value 1', 'Test Value 2'];

        spyOn(dataListService, 'get').and.returnValue(of(testDataList));
        fixture.detectChanges();

        expect(component.dataListInitial).toEqual(testDataList);
    });

    it('should handle error from dataListService when trying to get initial dataList', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        fixture.detectChanges();

        expect(component.dataListInitial).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });

    it('should get another dataList from service', () => {
        const testDataList = ['Test Value 3', 'Test Value 4'];

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
