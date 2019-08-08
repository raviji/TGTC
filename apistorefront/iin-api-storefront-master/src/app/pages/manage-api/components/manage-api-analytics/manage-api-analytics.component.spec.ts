import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCalendar, NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageApiAnalyticsComponent } from './manage-api-analytics.component';

describe('ManageApiAnalyticsComponent', () => {
    let component: ManageApiAnalyticsComponent;
    let fixture: ComponentFixture<ManageApiAnalyticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule],
            declarations: [ManageApiAnalyticsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageApiAnalyticsComponent);
        component = fixture.componentInstance;
        component.dataListInitial = {
            Analytics: '',
            'api-calls': {
                data: [
                    {
                        date: '1/1/2017',
                        value: 30
                    }
                ]
            },
            'no error statistic': {
                title: '96,99%',
                data: [
                    {
                        date: '1/1/2017',
                        value: 0.945
                    }
                ]
            },
            revenue: {
                title: '$3,321',
                data: [
                    {
                        date: '1/1/2017',
                        Planned: 880,
                        Actual: 350
                    }
                ]
            },
            latency: {
                title: '10 ms',
                data: [
                    {
                        date: '1/1/2017',
                        Planned: 18,
                        Actual: 8
                    }
                ]
            },
            'error event trends': {
                titleError: '75',
                titleSmallError: '-3.8%',
                'titleUser affected': '33',
                'titleSmallUser affected': '-13,2%',
                data: [
                    {
                        date: '1/1/2017',
                        number: 8
                    }
                ]
            }
        } as any;

        component.dataListAnotherVersion = {
            Analytics: '',
            'api-calls': {
                data: [
                    {
                        date: '1/1/2017',
                        value: 20
                    }
                ]
            },
            'no error statistic': {
                title: '90,99%',
                data: [
                    {
                        date: '1/1/2017',
                        value: 0.06
                    }
                ]
            },
            revenue: {
                title: '$3,321',
                data: [
                    {
                        date: '1/1/2017',
                        Planned: 345,
                        Actual: 356
                    }
                ]
            },
            latency: {
                title: '10 ms',
                data: [
                    {
                        date: '1/1/2017',
                        Planned: 10,
                        Actual: 5
                    }
                ]
            },
            'error event trends': {
                titleError: '75',
                titleSmallError: '-2.8%',
                'titleUser affected': '33',
                'titleSmallUser affected': '-10,2%',
                data: [
                    {
                        date: '1/1/2017',
                        number: 2
                    }
                ]
            }
        } as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should store initial data list', () => {
        expect(component).toBeTruthy();
        expect(component.dataList).toEqual(component.dataListInitial);
    });

    it('should convert month to text', () => {
        expect(component.convertMonthText(0)).toBe('');
        expect(component.convertMonthText(1)).toBe('Jan');
        expect(component.convertMonthText(2)).toBe('Feb');
        expect(component.convertMonthText(3)).toBe('Mar');
        expect(component.convertMonthText(4)).toBe('Apr');
        expect(component.convertMonthText(5)).toBe('May');
        expect(component.convertMonthText(6)).toBe('Jun');
        expect(component.convertMonthText(7)).toBe('Jul');
        expect(component.convertMonthText(8)).toBe('Aug');
        expect(component.convertMonthText(9)).toBe('Sep');
        expect(component.convertMonthText(10)).toBe('Oct');
        expect(component.convertMonthText(11)).toBe('Nov');
        expect(component.convertMonthText(12)).toBe('Dec');
    });

    it('should return true when date is in range', () => {
        // date equals fromDate
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 3;
        date['month'] = 1;
        date['year'] = 2019;
        expect(component.isRange(date)).toBeTruthy();

        // date equals toDate
        date['day'] = 10;
        date['month'] = 6;
        date['year'] = 2019;
        expect(component.isRange(date)).toBeTruthy();

        // date is inside range
        date['day'] = 24;
        date['month'] = 5;
        date['year'] = 2019;
        expect(component.isRange(date)).toBeTruthy();
    });

    it('should return false when date is not in range', () => {
        // date equals fromDate
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 2;
        date['month'] = 1;
        date['year'] = 2019;
        expect(component.isRange(date)).toBeFalsy();

        // date equals toDate
        date['day'] = 7;
        date['month'] = 7;
        date['year'] = 2019;
        expect(component.isRange(date)).toBeFalsy();
    });

    it('should change dataList when calendar is not visible', () => {
        expect(component.showCalendar).toBeFalsy();

        expect(component.showInitial).toBeTruthy();
        expect(component.dataList).toEqual(component.dataListInitial);

        component.changeData();

        expect(component.showInitial).toBeFalsy();
        expect(component.dataList).toEqual(component.dataListAnotherVersion);

        component.changeData();

        expect(component.showInitial).toBeTruthy();
        expect(component.dataList).toEqual(component.dataListInitial);
    });

    it('should not change dataList when calendar is visible', () => {
        expect(component.showCalendar).toBeFalsy();
        component.showCalendar = true;

        component.changeData();
        expect(component.showCalendar).toBeTruthy();
        expect(component.showInitial).toBeTruthy();
        expect(component.dataList).toEqual(component.dataListInitial);
    });

    it('should update date string when date is valid', () => {
        component.fromDateString = '';
        component.toDateString = '';

        expect(component.fromDate).toBeDefined();
        expect(component.toDate).toBeDefined();
        expect(component.fromDateString).toBe('');
        expect(component.toDateString).toBe('');

        component.updateDateString();

        expect(component.fromDateString).toBe('3 Jan 2019');
        expect(component.toDateString).toBe('10 Jun 2019');
    });

    it('should not update date string when date is invalid', () => {
        component.fromDate = null;
        component.toDate = null;
        component.fromDateString = '';
        component.toDateString = '';

        expect(component.fromDate).toBeNull();
        expect(component.toDate).toBeNull();
        expect(component.fromDateString).toBe('');
        expect(component.toDateString).toBe('');

        component.updateDateString();

        expect(component.fromDateString).toBe('');
        expect(component.toDateString).toBe('');
    });

    it('should not trigger change data if calendar is not shown on clickOutside', () => {
        spyOn(component, 'changeData');
        expect(component.showCalendar).toBeFalsy();

        component.clickOutdie();
        expect(component.showCalendar).toBeFalsy();
        expect(component.changeData).toHaveBeenCalledTimes(0);
    });

    it('should trigger change data if calendar is shown on clickOutside', () => {
        spyOn(component, 'changeData');
        component.showCalendar = true;
        expect(component.showCalendar).toBeTruthy();

        component.clickOutdie();
        expect(component.showCalendar).toBeFalsy();
        expect(component.changeData).toHaveBeenCalled();
    });

    it('should update fromDate onDateSelection when dates are invalid', () => {
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 2;
        date['month'] = 1;
        date['year'] = 2019;

        component.fromDate = null;
        component.toDate = null;

        component.onDateSelection(date);
        expect(component.toDate).toBeNull();
        expect(component.fromDate).toEqual(date);
        expect(component.fromDateString).toBe('2 Jan 2019');
    });

    it('should update fromDate onDateSelection when dates are valid', () => {
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 2;
        date['month'] = 1;
        date['year'] = 2019;

        component.onDateSelection(date);
        expect(component.fromDate).toEqual(date);
        expect(component.fromDateString).toBe('2 Jan 2019');
    });

    it('should update toDate onDateSelection when date is after fromDate', () => {
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 7;
        date['month'] = 1;
        date['year'] = 2019;
        component.toDate = null;

        component.onDateSelection(date);
        expect(component.toDate).toEqual(date);
        expect(component.toDateString).toBe('7 Jan 2019');
        expect(component.fromDateString).toBe('3 Jan 2019');
    });

    it('should return false when date is not hovered', () => {
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 7;
        date['month'] = 2;
        date['year'] = 2019;

        // fromDate is null
        component.fromDate = null;
        expect(component.isHovered(date)).toBeFalsy();

        // toDate is not null
        component.fromDate = date;
        component.toDate = null;
        expect(component.isHovered(date)).toBeFalsy();

        // isHovered is null
        component.hoveredDate = null;
        expect(component.isHovered(date)).toBeFalsy();

        // date is before from date
        component.hoveredDate = date;
        expect(component.isHovered(date)).toBeFalsy();

        // date is after from hovered
        component.fromDate['day'] = 5;
        expect(component.isHovered(date)).toBeFalsy();
    });

    it('should return true when date is hovered', () => {
        const calendar = TestBed.get(NgbCalendar);
        const date: NgbDate = calendar.getToday();
        date['day'] = 1;
        date['month'] = 2;
        date['year'] = 2019;

        const hoveredDate: NgbDate = calendar.getToday();
        date['day'] = 26;
        date['month'] = 4;
        date['year'] = 2019;

        component.hoveredDate = hoveredDate;
        component.toDate = null;
        expect(component.isHovered(date)).toBeTruthy();
    });
});
