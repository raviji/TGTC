import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddNewApiFormComponent } from './add-new-api-form.component';

describe('AddNewApiFormComponent', () => {
    let component: AddNewApiFormComponent;
    let fixture: ComponentFixture<AddNewApiFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
            declarations: [AddNewApiFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddNewApiFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not emit clickAddAPI event if form is invalid', () => {
        fixture.detectChanges();

        spyOn(component.clickAddAPI, 'emit');
        component.addAPI();

        expect(component.clickAddAPI.emit).toHaveBeenCalledTimes(0);
        expect(component.submitted).toBeTruthy();
    });

    it('should not emit clickAddAPI event if no categories', () => {
        component.addAPIFormData = {
            apiName: 'MockName',
            shortDescription: 'MockDescription',
            categories: ''
        };
        fixture.detectChanges();

        spyOn(component.clickAddAPI, 'emit');
        component.addAPI();

        expect(component.clickAddAPI.emit).toHaveBeenCalledTimes(0);
        expect(component.submitted).toBeTruthy();
    });


    it('should emit clickAddAPI event if form is valid', () => {
        component.addAPIFormData = {
            apiName: 'MockName',
            shortDescription: 'MockDescription',
            categories: 'MockCategory'
        };
        fixture.detectChanges();

        spyOn(component.clickAddAPI, 'emit');
        component.addAPI();

        expect(component.clickAddAPI.emit).toHaveBeenCalled();
        expect(component.submitted).toBeTruthy();
    });
});
