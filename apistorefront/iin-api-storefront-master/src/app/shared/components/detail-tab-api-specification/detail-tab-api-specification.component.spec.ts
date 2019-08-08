import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabAPISpecificationComponent } from './detail-tab-api-specification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DetailTabAPISpecificationComponent', () => {
    let component: DetailTabAPISpecificationComponent;
    let fixture: ComponentFixture<DetailTabAPISpecificationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DetailTabAPISpecificationComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailTabAPISpecificationComponent);
        component = fixture.componentInstance;
        component.dataList = [{
            subscriptionPrice: '10',
            planName: 'mock name',
            planDescriptions: 'mock description'
        }];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display tab pricing content if loggedIn', () => {
        expect(fixture.nativeElement.querySelectorAll('a.red-border').length).toBe(0);
        expect(fixture.nativeElement.querySelectorAll('h2.title-bold').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('div.select-box').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('div.select-list').length).toBe(1);
    });

    it('should not display tab pricing content if not loggedIn', () => {
        component.isLoggedIn = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('a.red-border').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('h2.title-bold').length).toBe(0);
        expect(fixture.nativeElement.querySelectorAll('div.select-box').length).toBe(0);
        expect(fixture.nativeElement.querySelectorAll('div.select-list').length).toBe(0);
    });
});
