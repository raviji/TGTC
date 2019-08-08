import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { DefaultPageComponent } from './default-page.component';


describe('add-api/DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;
    let dataListService: DataListService;
    let cookie: CookieService;

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
                CookieService
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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should increment step when add api', () => {
        const testValue = '';
        expect(component.addedAPI).toBeFalsy();
        expect(component.currentStepIndex).toBe(0);

        component.clickAddAPI(testValue);

        expect(component.addedAPI).toBeTruthy();
        expect(component.currentStepIndex).toBe(1);
    });

    it('should increment/decrement step when click next/previous', () => {
        const testValue = '';
        expect(component.currentStepIndex).toBe(0);

        component.clickNext(testValue);
        expect(component.currentStepIndex).toBe(1);

        component.clickNext(testValue);
        expect(component.currentStepIndex).toBe(2);

        component.clickPrevious(testValue);
        expect(component.currentStepIndex).toBe(1);

        component.clickNext(testValue);
        expect(component.currentStepIndex).toBe(2);

        component.clickPrevious(testValue);
        expect(component.currentStepIndex).toBe(1);

        component.clickPrevious(testValue);
        expect(component.currentStepIndex).toBe(0);
    });

    it('should navigate to dashboard when click deleteApi', () => {
        const testValue = '';
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component.clickDeleteAPI(testValue);
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should get dataList from service', () => {
        const testDataListDropdown = ['Test Value 1', 'Test Value 2', 'Test Value 3'];

        spyOn(dataListService, 'get').and.returnValue(of(testDataListDropdown));
        fixture.detectChanges();

        expect(component.dataListDropdown).toEqual(testDataListDropdown);
    });

    it('should handle error from dataListService', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        fixture.detectChanges();

        expect(component.dataListDropdown).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });

    it('should append new api to existing myAPIList cookie and navigate to dashboard', () => {
        const testCookie = [{ apiName: 'First Api' }];
        const router = TestBed.get(Router);
        component.addAPIFormData['apiName'] = 'Second Api';

        spyOn(router, 'navigate');
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(testCookie));
        spyOn(cookie, 'set');
        component.showMyAPI();

        expect(cookie.set).toHaveBeenCalledWith('myAPIList',
            '[{"apiName":"First Api"},{"apiName":"Second Api","expanded":false}]', null, '/');
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
});
