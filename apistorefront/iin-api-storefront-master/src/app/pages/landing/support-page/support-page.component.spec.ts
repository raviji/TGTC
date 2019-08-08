import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPageComponent } from './support-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SupportPageComponent', () => {
    let component: SupportPageComponent;
    let fixture: ComponentFixture<SupportPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [SupportPageComponent],
            providers: [DataListService, CookieService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportPageComponent);
        component = fixture.componentInstance;
        component.dataList = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
