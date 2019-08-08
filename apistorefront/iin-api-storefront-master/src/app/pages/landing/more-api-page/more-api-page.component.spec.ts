import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MoreAPIPageComponent } from './more-api-page.component';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError, of } from 'rxjs';


describe('landing/MoreAPIPageComponent', () => {
    let component: MoreAPIPageComponent;
    let fixture: ComponentFixture<MoreAPIPageComponent>;
    let dataListService: DataListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [MoreAPIPageComponent],
            providers: [DataListService, CookieService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoreAPIPageComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not update scrollPos when there is no more content to load', () => {
        const e = { endReached: false };

        component.updateScrollPos(e);

        expect(component.hasShownLoadMore).toBeFalsy();
        expect(component.showLoadMore).toBeFalsy();
    });

    it('should update scrollPos when there is more content to load', fakeAsync(() => {
        const e = { endReached: true };

        component.updateScrollPos(e);

        expect(component.hasShownLoadMore).toBeTruthy();
        expect(component.showLoadMore).toBeTruthy();
        tick(4000);

        expect(component.showLoadMore).toBeFalsy();
    }));


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
