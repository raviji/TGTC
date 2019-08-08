import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APIBoxComponent } from './api-box.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('APIBoxComponent', () => {
    let component: APIBoxComponent;
    let fixture: ComponentFixture<APIBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [APIBoxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(APIBoxComponent);
        component = fixture.componentInstance;
        component.isLoggedIn = false;
        component.isShownTag = true;
        component.viewType = 'list';

        component.itemData = {
            pageId: '0',
            iconName: 'icon-risk.svg',
            title: 'Risk Scoring',
            description: 'Risk Scoring ...',
            tagList: [
                {
                    name: 'Banking'
                },
                {
                    name: 'FX'
                }
            ]
        } as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
