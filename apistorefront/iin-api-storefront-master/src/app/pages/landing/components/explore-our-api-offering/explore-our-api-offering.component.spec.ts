import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreOurAPIOfferingComponent } from './explore-our-api-offering.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExploreOurAPIOfferingComponent', () => {
    let component: ExploreOurAPIOfferingComponent;
    let fixture: ComponentFixture<ExploreOurAPIOfferingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ExploreOurAPIOfferingComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExploreOurAPIOfferingComponent);
        component = fixture.componentInstance;
        component.dataList = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
