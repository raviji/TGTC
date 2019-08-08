import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNonLoginComponent } from './footer-non-login.component';

describe('FooterNonLoginComponent', () => {
    let component: FooterNonLoginComponent;
    let fixture: ComponentFixture<FooterNonLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FooterNonLoginComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterNonLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
