import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecommendedApiComponent } from './dashboard-recommended-api.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardRecommendedApiComponent', () => {
    let component: DashboardRecommendedApiComponent;
    let fixture: ComponentFixture<DashboardRecommendedApiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DashboardRecommendedApiComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardRecommendedApiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
