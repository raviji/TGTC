import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabKeyFeaturesComponent } from './detail-tab-key-features.component';

describe('DetailTabKeyFeaturesComponent', () => {
    let component: DetailTabKeyFeaturesComponent;
    let fixture: ComponentFixture<DetailTabKeyFeaturesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailTabKeyFeaturesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailTabKeyFeaturesComponent);
        component = fixture.componentInstance;

        component.dataList = {
            idVveification: '...',
            paymentBehavior: '...',
            lengthOfStay: '...',
        } as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
