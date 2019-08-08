import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedByTheLargestCompanyComponent } from './trusted-by-the-largest-company.component';

describe('TrustedByTheLargestCompanyComponent', () => {
    let component: TrustedByTheLargestCompanyComponent;
    let fixture: ComponentFixture<TrustedByTheLargestCompanyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrustedByTheLargestCompanyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrustedByTheLargestCompanyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
