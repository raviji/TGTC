import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleBarChartComponent } from './double-bar-chart.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DoubleBarChartComponent', () => {
    let component: DoubleBarChartComponent;
    let fixture: ComponentFixture<DoubleBarChartComponent>;
    let svgElement: SVGElement;
    let itemData: any[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DoubleBarChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DoubleBarChartComponent);
        component = fixture.componentInstance;
        component.showAndriodFilter = false;
        component.showPaymentFilter = false;

        itemData = {
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

    it('should create', () => {
        component.itemData = itemData;
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('g.tick').length).toBe(17);
        expect(svgElement.querySelectorAll('.axis--x').length).toBe(1);
        expect(svgElement.querySelectorAll('.axis--y').length).toBe(1);
        expect(svgElement.querySelectorAll('rect.bar').length).toBe(0);
    });

    it('should add payment and android bar when showPaymentFilter and showAndriodFilter are both true', () => {
        component.showAndriodFilter = true;
        component.showPaymentFilter = true;
        component.itemData = itemData;
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(svgElement.querySelectorAll('rect.bar').length).toBe(12);
    });

    it('should call createChart when onResize is called', () => {
        component.itemData = itemData;
        fixture.detectChanges();

        spyOn(component, 'createChart');
        component.onResize(0);
        expect(component.createChart).toHaveBeenCalledWith(component.itemData);
    });

    it('should call createChart when ngOnChanges is called', () => {
        component.itemData = itemData;
        fixture.detectChanges();

        spyOn(component, 'createChart');
        component.ngOnChanges();
        expect(component.createChart).toHaveBeenCalledWith(component.itemData);
    });

    it('should call createChart when render is called', () => {
        component.itemData = itemData;
        fixture.detectChanges();

        spyOn(component, 'createChart');
        component.render();
        expect(component.createChart).toHaveBeenCalledWith(component.itemData);
    });
});
