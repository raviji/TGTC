import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartDoubleComponent } from './line-chart-double.component';

describe('LineChartDoubleComponent', () => {
    let component: LineChartDoubleComponent;
    let fixture: ComponentFixture<LineChartDoubleComponent>;
    let svgElement: SVGElement;
    let itemDataSimple: any[];
    let itemDataPercentage: any[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LineChartDoubleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LineChartDoubleComponent);
        component = fixture.componentInstance;
        component.showAndriodFilter = false;
        component.showPaymentFilter = false;

        itemDataSimple = {
            data: [
                {
                    date: '1/1/2017',
                    Planned: 880,
                    Actual: 350
                },
                {
                    date: '2/1/2017',
                    Planned: 750,
                    Actual: 650
                },
                {
                    date: '3/1/2017',
                    Planned: 850,
                    Actual: 500
                }]
        } as any;

        itemDataPercentage = {
            data: [
                {
                    date: '1/1/2017',
                    andriodNumber: 0.980,
                    paymentNumber: 0.985
                },
                {
                    date: '2/1/2017',
                    andriodNumber: 0.978,
                    paymentNumber: 0.953
                },
                {
                    date: '3/1/2017',
                    andriodNumber: 0.958,
                    paymentNumber: 0.960
                },
                {
                    date: '4/1/2017',
                    andriodNumber: 0.949,
                    paymentNumber: 0.950
                },
                {
                    date: '5/1/2017',
                    andriodNumber: 0.955,
                    paymentNumber: 0.956
                },
                {
                    date: '6/1/2017',
                    andriodNumber: 0.975,
                    paymentNumber: 0.954
                }]
        } as any;

        svgElement = fixture.debugElement.nativeElement.querySelector('svg');
    });

    it('should create when chartType is empty', () => {
        component.itemData = itemDataSimple;
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('g.tick').length).toBe(9);
        expect(svgElement.querySelectorAll('.axis--x').length).toBe(1);
        expect(svgElement.querySelectorAll('.axis--y').length).toBe(1);
        expect(svgElement.querySelectorAll('.line').length).toBe(0);
    });

    it('should create when chartType is percentage', () => {
        component.chartType = 'percentage';
        component.itemData = itemDataPercentage;
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('g.tick').length).toBe(19);
        expect(svgElement.querySelectorAll('.axis--x').length).toBe(1);
        expect(svgElement.querySelectorAll('.axis--y').length).toBe(1);
        expect(svgElement.querySelectorAll('.line').length).toBe(0);
    });

    it('should add andriod valueline when showAndriodFilter is true', () => {
        component.showAndriodFilter = true;
        component.chartType = 'percentage';
        component.itemData = itemDataPercentage;

        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('.line').length).toBe(1);
    });

    it('should add payment valueline when showPaymentFilter is true', () => {
        component.showPaymentFilter = true;
        component.chartType = 'percentage';
        component.itemData = itemDataPercentage;
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('.line').length).toBe(1);
    });

    it('should call createChart when onResize is called', () => {
        component.itemData = itemDataSimple;
        fixture.detectChanges();

        spyOn(component, 'createChart');
        component.onResize(0);
        expect(component.createChart).toHaveBeenCalledWith(component.itemData);
    });

    it('should call createChart when ngOnChanges is called', () => {
        component.itemData = itemDataSimple;
        fixture.detectChanges();

        spyOn(component, 'createChart');
        component.ngOnChanges();
        expect(component.createChart).toHaveBeenCalledWith(component.itemData);
    });
});
