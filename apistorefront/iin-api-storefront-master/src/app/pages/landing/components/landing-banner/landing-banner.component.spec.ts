import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBannerComponent } from './landing-banner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LandingBannerComponent', () => {
    let component: LandingBannerComponent;
    let fixture: ComponentFixture<LandingBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [LandingBannerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingBannerComponent);
        component = fixture.componentInstance;
        component.dataList = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
