import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabPricingComponent } from './detail-tab-pricing.component';
import { ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailTabPricingComponent', () => {
    let component: DetailTabPricingComponent;
    let fixture: ComponentFixture<DetailTabPricingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DetailTabPricingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailTabPricingComponent);
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
        expect(fixture.nativeElement.querySelectorAll('h2.title').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('div.avail-box').length).toBe(1);
    });

    it('should not display tab pricing content if not loggedIn', () => {
        component.isLoggedIn = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('a.red-border').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('h2.title').length).toBe(0);
        expect(fixture.nativeElement.querySelectorAll('div.avail-box').length).toBe(0);
    });
});
