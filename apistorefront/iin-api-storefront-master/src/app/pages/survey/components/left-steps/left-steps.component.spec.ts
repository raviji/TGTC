import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftStepsComponent } from './left-steps.component';

describe('LeftStepsComponent', () => {
    let component: LeftStepsComponent;
    let fixture: ComponentFixture<LeftStepsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeftStepsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeftStepsComponent);
        component = fixture.componentInstance;

        component.currentIndex = 0;
        component.dataList = [
            {
                title: 'What is the purpose of you visiting this website?',
                selectedOption: ''
            },
            {
                title: 'Are you interested with Paying API?',
                selectedOption: ''
            }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit clickNext event', () => {
        spyOn(component.clickNext, 'emit');
        component.next();

        expect(component.clickNext.emit).toHaveBeenCalled();
    });
});
