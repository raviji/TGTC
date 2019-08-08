import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabDescriptionComponent } from './detail-tab-description.component';

describe('DetailTabDescriptionComponent', () => {
    let component: DetailTabDescriptionComponent;
    let fixture: ComponentFixture<DetailTabDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailTabDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailTabDescriptionComponent);
        component = fixture.componentInstance;

        component.dataList = {
            apiRating: 5,
            provider: 'INDODARMA GROUP',
            contactInformation: '(+1) 6755 8755 - indodarma@techno.com',
            totalDownloads: '1.334.878 Downloads',
            paragraphs: [
                {
                    content: 'Risk Scoring ...'
                },
                {
                    content: 'Risk Scoring ...'
                },
                {
                    content: 'Risk Scoring ...'
                }
            ]
        } as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
