import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordFormComponent } from './forgot-password-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ForgotPasswordFormComponent', () => {
    let component: ForgotPasswordFormComponent;
    let fixture: ComponentFixture<ForgotPasswordFormComponent>;
    let router: Router;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
            declarations: [ForgotPasswordFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.get(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should do nothing when sendMessage and form is invalid', () => {
        spyOn(router, 'navigate');

        component.clickSendMessage();
        expect(component.formGroup.valid).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledTimes(0);
    });

    it('should navigate to login when sendMessage and form is valid', () => {
        spyOn(router, 'navigate');
        component.f.email.setValue('test@test.com');

        component.clickSendMessage();
        expect(component.formGroup.valid).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
