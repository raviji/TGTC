import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApiSupportComponent } from './manage-api-support.component';

describe('ManageApiSupportComponent', () => {
    let component: ManageApiSupportComponent;
    let fixture: ComponentFixture<ManageApiSupportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageApiSupportComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageApiSupportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
