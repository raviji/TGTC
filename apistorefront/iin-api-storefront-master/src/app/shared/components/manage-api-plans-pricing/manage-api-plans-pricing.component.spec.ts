
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageApiPlansPricingComponent } from './manage-api-plans-pricing.component';


describe('ManageApiPlansPricingComponent', () => {
    let component: ManageApiPlansPricingComponent;
    let fixture: ComponentFixture<ManageApiPlansPricingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageApiPlansPricingComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageApiPlansPricingComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add plan', () => {
        component.clickAddPlanType();
        const validationData = {
            planType: '',
            subscriptionPrice: '',
            planName: '',
            planDescriptions: ''
        };

        expect(component.modalData['name']).toEqual('addPlanType');
        expect(component.modalData['data']).toEqual(validationData);
    });

    it('should edit plan', () => {
        const index = 1;
        component.dataList = [
            {
                planType: 'PlanType1',
                subscriptionPrice: 'SubscriptionPrice1',
                planName: 'PlanName1',
                planDescriptions: 'PlanDescriptions1'
            },
            {
                planType: 'PlanType2',
                subscriptionPrice: 'SubscriptionPrice2',
                planName: 'PlanName2',
                planDescriptions: 'PlanDescriptions2'
            }
        ];
        fixture.detectChanges();

        component.clickEditPlanType(index);

        fixture.detectChanges();
        expect(component.modalData['name']).toEqual('editPlanType');
        expect(component.modalData['data']).toEqual(component.dataList[index]);
    });

    it('should not update for unknown type', () => {
        const index = 1;
        component.modalData = {
            name: 'unknown',
            data: {
                planType: '',
                subscriptionPrice: '',
                planName: '',
                planDescriptions: ''
            }
        };
        fixture.detectChanges();

        component.savePlanType(index);

        expect(component.modalData['name']).toEqual('');
        expect(component.dataList).toBeUndefined();
    });

    it('should not update for editplanType', () => {
        const index = 1;
        component.modalData = {
            name: 'editPlanType',
            data: {
                planType: 'PlanType',
                subscriptionPrice: 'SubscriptionPrice',
                planName: 'PlanName',
                planDescriptions: 'PlanDescriptions'
            }
        };
        fixture.detectChanges();

        component.savePlanType(index);

        expect(component.modalData['name']).toEqual('');
        expect(component.dataList).toBeUndefined();
    });

    it('should not update for addPlanType if dataList is undefined', () => {
        const index = 1;
        component.modalData = {
            name: 'addPlanType',
            data: {
                planType: 'PlanType',
                subscriptionPrice: 'SubscriptionPrice',
                planName: 'PlanName',
                planDescriptions: 'PlanDescriptions'
            }
        };
        fixture.detectChanges();

        expect(() => { component.savePlanType(index); }).toThrowError();

        expect(component.modalData['name']).toEqual('addPlanType');
        expect(component.dataList).toBeUndefined();
    });

    it('should update for addPlanType', () => {
        const index = 1;
        component.dataList = [];
        component.modalData = {
            name: 'addPlanType',
            data: {
                planType: 'PlanType',
                subscriptionPrice: 'SubscriptionPrice',
                planName: 'PlanName',
                planDescriptions: 'PlanDescriptions'
            }
        };
        fixture.detectChanges();

        component.savePlanType(index);

        expect(component.modalData['name']).toEqual('');
        expect(component.dataList.length).toEqual(1);
        expect(component.modalData['data']).toEqual(component.dataList[0]);
    });
});
