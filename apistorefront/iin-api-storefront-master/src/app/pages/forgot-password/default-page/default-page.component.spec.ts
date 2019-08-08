import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPageComponent } from './default-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('forgot-password/DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DefaultPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
