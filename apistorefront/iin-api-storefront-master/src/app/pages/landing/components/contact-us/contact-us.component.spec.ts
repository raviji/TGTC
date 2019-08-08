import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';

describe('ContactUsComponent', () => {
    let component: ContactUsComponent;
    let fixture: ComponentFixture<ContactUsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ContactUsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form group', () => {
        expect(component.f.name.value).toBe('');
        expect(component.f.email.value).toBe('');
        expect(component.f.subject.value).toBe('');
        expect(component.f.message.value).toBe('');
    });

    it('should stop sending message if form is invalid', () => {
        expect(component.f.name.value).toBe('');
        expect(component.f.email.value).toBe('');
        expect(component.f.subject.value).toBe('');
        expect(component.f.message.value).toBe('');

        component.sendMessage();
        expect(component.formGroup.valid).toBeFalsy();
    });

    it('should send message if form is valid', () => {
        component.f.name.setValue('test');
        component.f.email.setValue('test@test.com');
        component.f.subject.setValue('test');
        component.f.message.setValue('test');

        component.sendMessage();
        expect(component.formGroup.valid).toBeTruthy();
    });
});
