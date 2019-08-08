import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPageComponent } from './default-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;
    let dataListService: DataListService;
    let mockDataList: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DefaultPageComponent],
            providers: [DataListService, CookieService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dataListService = TestBed.get(DataListService);
        mockDataList = {
            imgUrl: 'dummy url',
            fullName: 'dummy fullName',
            email: 'mock@gmail.com',
            phoneNumber: '+66 888 6868 3333',
            github: 'dummyName'
        } as any;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get dataList from service and update datalist apiName', () => {

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
});
