import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoginComponent } from './header-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataListService } from '../../services/data-list.service';
import { CookieService } from 'ngx-cookie-service';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderLoginComponent', () => {
    let component: HeaderLoginComponent;
    let fixture: ComponentFixture<HeaderLoginComponent>;
    let dataListService: DataListService;
    let router: Router;
    let mockDataList: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [HeaderLoginComponent],
            providers: [DataListService, CookieService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dataListService = TestBed.get(DataListService);
        router = TestBed.get(Router);

        mockDataList = {
            Overview: {
                apiName: 'TestApiName',
            }
        };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate out when logout successfull', () => {
        spyOn(dataListService, 'logout').and.returnValue(of({}));
        spyOn(router, 'navigate');
        component.clickLogout();

        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should get dataList from service', () => {
        spyOn(dataListService, 'get').and.returnValue(of(mockDataList));
        component.getDataList('dummyUrl');

        expect(component.dataList).toEqual(mockDataList);
    });

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
});
