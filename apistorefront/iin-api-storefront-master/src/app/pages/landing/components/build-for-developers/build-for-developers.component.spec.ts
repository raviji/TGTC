import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildForDevelopersComponent } from './build-for-developers.component';

describe('BuildForDevelopersComponent', () => {
    let component: BuildForDevelopersComponent;
    let fixture: ComponentFixture<BuildForDevelopersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuildForDevelopersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuildForDevelopersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
