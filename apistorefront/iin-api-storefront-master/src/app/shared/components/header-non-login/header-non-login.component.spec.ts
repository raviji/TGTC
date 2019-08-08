import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNonLoginComponent } from './header-non-login.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderNonLoginComponent', () => {
    let component: HeaderNonLoginComponent;
    let fixture: ComponentFixture<HeaderNonLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeaderNonLoginComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderNonLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
