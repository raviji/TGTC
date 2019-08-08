import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightQuestionComponent } from './right-question.component';

describe('RightQuestionComponent', () => {
    let component: RightQuestionComponent;
    let fixture: ComponentFixture<RightQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RightQuestionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RightQuestionComponent);
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
});
