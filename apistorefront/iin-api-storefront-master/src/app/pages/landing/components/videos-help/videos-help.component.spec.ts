import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosHelpComponent } from './videos-help.component';

describe('VideosHelpComponent', () => {
    let component: VideosHelpComponent;
    let fixture: ComponentFixture<VideosHelpComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VideosHelpComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideosHelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
