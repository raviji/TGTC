import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPageComponent } from './default-page.component';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('survey/DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;
    let dataListService: DataListService;

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should increment index when clickNext if there is more content to show', () => {
        const testDataList = {
            Survey: [
                {
                    title: 'What is the purpose of you visiting this website?',
                    selectedOption: ''
                },
                {
                    title: 'Are you interested with Paying API?',
                    selectedOption: '',
                },
                {
                    title: 'How Big Is Your Company?',
                    selectedOption: '',
                }
            ]
        } as any;

        component.dataList = testDataList;
        fixture.detectChanges();

        expect(component.currentIndex).toBe(0);

        component.clickNext({});
        expect(component.currentIndex).toBe(1);

        component.clickNext({});
        expect(component.currentIndex).toBe(2);
    });

    it('should showThankYou when clickNext if there is no more content to show', () => {
        const testDataList = {
            Survey: [
                {
                    title: 'How Big Is Your Company?',
                    selectedOption: '',
                }
            ]
        } as any;

        component.dataList = testDataList;
        fixture.detectChanges();

        expect(component.currentIndex).toBe(0);
        expect(component.showThankYou).toBeFalsy();

        component.clickNext({});
        expect(component.currentIndex).toBe(0);
        expect(component.showThankYou).toBeTruthy();
    });

    it('should get dataList from service', () => {
        const testDataList = ['Test Value 1', 'Test Value 2'];

        spyOn(dataListService, 'get').and.returnValue(of(testDataList));
        fixture.detectChanges();

        expect(component.dataList).toEqual(testDataList);
    });

    it('should handle error from dataListService', () => {
        const testError = 'something went wrong';

        spyOn(dataListService, 'get').and.returnValue(throwError(testError));
        fixture.detectChanges();

        expect(component.dataList).toBeNull();
        expect(component.errorMessage).toBe(testError);
    });
});
