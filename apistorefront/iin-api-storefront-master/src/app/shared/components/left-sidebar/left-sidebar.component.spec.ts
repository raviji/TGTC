import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { DataListService } from '../../services/data-list.service';
import { LeftSidebarComponent } from './left-sidebar.component';


class ActivatedRouteStub {
    private subject = new Subject();

    push(value) {
        this.subject.next(value);
    }

    get params() {
        return this.subject.asObservable();
    }
}

describe('LeftSidebarComponent', () => {
    let component: LeftSidebarComponent;
    let fixture: ComponentFixture<LeftSidebarComponent>;
    let dataListService: DataListService;
    let cookie: CookieService;
    let router: Router;

    let mockApiList: {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                LeftSidebarComponent
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
        fixture = TestBed.createComponent(LeftSidebarComponent);
        component = fixture.componentInstance;

        dataListService = TestBed.get(DataListService);
        cookie = TestBed.get(CookieService);
        router = TestBed.get(Router);

        mockApiList = [
            {
                apiName: 'Api Name 1',
                expanded: false
            },
            {
                apiName: 'Api Name 2',
                expanded: false
            }
        ];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get myApiList cookie', () => {
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        fixture.detectChanges();
        expect(component.myAPIList).toEqual(mockApiList);
    });

    it('should not update detailId when route is changed and param is undefined', fakeAsync(() => {
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        fixture.detectChanges();
        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ myAPIId: undefined });
        tick();

        expect(component.detailId).toBe(-1);
    }));

    it('should update detailId when route is changed and param is valid', fakeAsync(() => {
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        fixture.detectChanges();
        const activatedRoute = TestBed.get(ActivatedRoute);
        activatedRoute.push({ myAPIId: 1 });
        tick();

        expect(component.detailId).toBe(1);
    }));

    it('should update expanded flag when detailId is valid', fakeAsync(() => {
        spyOn(cookie, 'get').and.returnValue(JSON.stringify(mockApiList));
        component.detailId = 1;
        fixture.detectChanges();

        expect(component.detailId).toBe(1);
        expect(component.myAPIList[1]['expanded']).toBeTruthy();
    }));

    it('should redirect to definition page when authorised', fakeAsync(() => {
        component.myAPIList = mockApiList;
        spyOn(router, 'navigate');
        spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

        component.clickDefinitionLink(1);
        tick();

        expect(router.navigate).toHaveBeenCalledWith(['/manage-api/default-page/1']);
    }));

    it('should redirect to analytics page when authorised', fakeAsync(() => {
        component.myAPIList = mockApiList;
        spyOn(router, 'navigate');
        spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

        component.clickAnalyticsLink(1);
        tick();

        expect(router.navigate).toHaveBeenCalledWith(['/manage-api/analytics-page/1']);
    }));

    it('should redirect to support page when authorised', fakeAsync(() => {
        component.myAPIList = mockApiList;
        spyOn(router, 'navigate');
        spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

        component.clickSupportLink(1);
        tick();
        expect(router.navigate).toHaveBeenCalledWith(['/manage-api/support-page/1']);
    }));
});
