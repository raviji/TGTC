import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouFormComponent } from './thank-you-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThankYouFormComponent', () => {
    let component: ThankYouFormComponent;
    let fixture: ComponentFixture<ThankYouFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ThankYouFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThankYouFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
