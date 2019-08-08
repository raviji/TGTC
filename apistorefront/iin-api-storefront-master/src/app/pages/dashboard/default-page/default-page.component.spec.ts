import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { DefaultPageComponent } from './default-page.component';


describe('dashboard/DefaultPageComponent', () => {
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

    it('should update currentTab when changeTab is clicked', () => {
        const testTab = 'Test Tab';

        expect(component.currentTab).toBe('Subscribed API');
        component.changeTab(testTab);

        expect(component.currentTab).toBe(testTab);
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
