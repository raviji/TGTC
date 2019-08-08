import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileFormComponent', () => {
    let component: ProfileFormComponent;
    let fixture: ComponentFixture<ProfileFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
            declarations: [ProfileFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update form on component init', () => {
        const mockDataList = {
            fullName: 'mock name',
            email: 'mock email',
            phoneNumber: '00 0000 0000',
            github: 'mock github',
        } as any;

        component.dataList = mockDataList;
        fixture.detectChanges();

        expect(component.f.fullName.value).toBe(mockDataList.fullName);
        expect(component.f.email.value).toBe(mockDataList.email);
        expect(component.f.phoneNumber.value).toBe(mockDataList.phoneNumber);
        expect(component.f.github.value).toBe(mockDataList.github);
    });

    it('should emit clickUpdateProfile when form is valid', () => {
        const mockDataList = {
            fullName: 'mock name',
            email: 'mock@email.com',
            phoneNumber: '00 0000 0000',
            github: 'mock github',
        } as any;

        component.dataList = mockDataList;
        spyOn(component.clickUpdateProfile, 'emit');
        fixture.detectChanges();

        component.updateProfile();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.clickUpdateProfile.emit).toHaveBeenCalled();
    });

    it('should not emit clickUpdateProfile when form is invalid', () => {
        const mockDataList = {
            fullName: 'mock name',
            email: 'mock email.com',
            phoneNumber: '',
            github: 'mock github',
        } as any;

        component.dataList = mockDataList;
        spyOn(component.clickUpdateProfile, 'emit');
        fixture.detectChanges();

        component.updateProfile();
        expect(component.formGroup.valid).toBeFalsy();
        expect(component.clickUpdateProfile.emit).toHaveBeenCalledTimes(0);
    });

    it('should not get imageUrl if file not uploaded', () => {
        const mockFileInput = {
            target: {
                files: []
            }
        };
        const mockDataList = {
            fullName: 'mock name',
            email: 'mock email.com',
            phoneNumber: '',
            github: 'mock github',
        } as any;

        component.dataList = mockDataList;
        fixture.detectChanges();

        component.selectFile(mockFileInput);
    });

    it('should get imageUrl if file uploaded', () => {
        const blob = new Blob(['Content'], { type: 'text/plain' });
        const mockFileInput = {
            target: {
                files: [
                    blob
                ]
            }
        };
        const mockDataList = {
            fullName: 'mock name',
            email: 'mock email.com',
            phoneNumber: '',
            github: 'mock github',
        } as any;

        component.dataList = mockDataList;
        fixture.detectChanges();

        component.selectFile(mockFileInput);
    });
});
