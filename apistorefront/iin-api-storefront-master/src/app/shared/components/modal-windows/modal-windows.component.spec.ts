import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalWindowsComponent } from './modal-windows.component';


describe('ModalWindowsComponent', () => {
    let component: ModalWindowsComponent;
    let fixture: ComponentFixture<ModalWindowsComponent>;
    let mockModalData = {
        name: '',
        data: null
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ModalWindowsComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalWindowsComponent);
        component = fixture.componentInstance;

        mockModalData = {
            name: 'addPlanType',
            data: {
                planType: 'mock planType',
                subscriptionPrice: '',
                planName: 'mock name',
                planDescriptions: 'mock description',
                group: '',
                endpoint: 'mock endpoint',
                method: 'mock method',
                description: 'mock description',
                key: 'mock key',
                value: 'mock value'
            }
        };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not create formGroup if modal name is invalid', () => {
        fixture.detectChanges();
        expect(component.modalData['name']).toBe('');
        expect(component.formGroup).toBeUndefined();
    });

    it('should create formGroup for addPlanType', () => {
        mockModalData.name = 'addPlanType';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData.name).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.planType.value).toBe(mockModalData.data.planType);
        expect(component.f.subscriptionPrice.value).toBe(mockModalData.data.subscriptionPrice);
        expect(component.f.planName.value).toBe(mockModalData.data.planName);
        expect(component.f.planDescriptions.value).toBe(mockModalData.data.planDescriptions);
    });

    it('should create formGroup for editPlanType', () => {
        mockModalData['name'] = 'editPlanType';
        mockModalData['data']['subscriptionPrice'] = '20';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData.name).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.planType.value).toBe(mockModalData.data.planType);
        expect(component.f.subscriptionPrice.value).toBe('$' + mockModalData.data.subscriptionPrice);
        expect(component.f.planName.value).toBe(mockModalData.data.planName);
        expect(component.f.planDescriptions.value).toBe(mockModalData.data.planDescriptions);
    });

    it('should create formGroup for addGroup', () => {
        mockModalData['name'] = 'addGroup';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.group.value).toBe(mockModalData.data.group);
    });

    it('should create formGroup for editGroup', () => {
        mockModalData['name'] = 'editGroup';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.group.value).toBe(mockModalData.data.group);
    });

    it('should create formGroup for addEndpoint', () => {
        mockModalData['name'] = 'addEndpoint';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.endpoint.value).toBe(mockModalData.data.endpoint);
        expect(component.f.method.value).toBe(mockModalData.data.method);
        expect(component.f.description.value).toBe(mockModalData.data.description);
    });

    it('should create formGroup for editEndpoint', () => {
        mockModalData['name'] = 'editEndpoint';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.endpoint.value).toBe(mockModalData.data.endpoint);
        expect(component.f.method.value).toBe(mockModalData.data.method);
        expect(component.f.description.value).toBe(mockModalData.data.description);
    });

    it('should create formGroup for addSecretHeaderOrParameter', () => {
        mockModalData['name'] = 'addSecretHeaderOrParameter';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.key.value).toBe(mockModalData.data.key);
        expect(component.f.value.value).toBe(mockModalData.data.value);
    });

    it('should create formGroup for editSecretHeaderOrParameter', () => {
        mockModalData['name'] = 'editSecretHeaderOrParameter';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.formGroup).toBeDefined();
        expect(component.f.key.value).toBe(mockModalData.data.key);
        expect(component.f.value.value).toBe(mockModalData.data.value);
    });

    it('should reset modal type when clickClose', () => {
        mockModalData['name'] = 'editEndpoint';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        component.clickClose();
        expect(component.modalData['name']).toBe('');
    });

    it('should increment subscription price when clickPlus', () => {
        mockModalData['name'] = 'addPlanType';
        mockModalData['data']['subscriptionPrice'] = '20';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.f.subscriptionPrice.value).toBe('$20');

        component.clickPlus();
        expect(component.f.subscriptionPrice.value).toBe('$21');

        component.clickPlus();
        expect(component.f.subscriptionPrice.value).toBe('$22');

        component.f.subscriptionPrice.setValue('');
        expect(component.f.subscriptionPrice.value).toBe('');

        component.clickPlus();
        component.f.subscriptionPrice.setValue('$0');

        component.clickPlus();
        component.f.subscriptionPrice.setValue('$1');

        component.clickPlus();
        component.f.subscriptionPrice.setValue('$2');
    });

    it('should decrement subscription price when clickMinus', () => {
        mockModalData['name'] = 'addPlanType';
        mockModalData['data']['subscriptionPrice'] = '2';
        component.modalData = mockModalData;
        fixture.detectChanges();

        expect(component.modalData['name']).toBe(mockModalData.name);
        expect(component.f.subscriptionPrice.value).toBe('$2');

        component.clickMinus();
        expect(component.f.subscriptionPrice.value).toBe('$1');

        component.clickMinus();
        expect(component.f.subscriptionPrice.value).toBe('$0');

        component.clickMinus();
        expect(component.f.subscriptionPrice.value).toBe('$0');

        component.f.subscriptionPrice.setValue('');
        expect(component.f.subscriptionPrice.value).toBe('');

        component.clickMinus();
        component.f.subscriptionPrice.setValue('$0');

        component.clickMinus();
        component.f.subscriptionPrice.setValue('$0');
    });

    it('should return false when is not a decimal number', () => {
        expect(component.onlyDecimalNumberKey({ which: 65 })).toBeFalsy();
        expect(component.onlyDecimalNumberKey({ which: 72 })).toBeFalsy();
        expect(component.onlyDecimalNumberKey({ keyCode: 75 })).toBeFalsy();
        expect(component.onlyDecimalNumberKey({ which: 32 })).toBeFalsy();
        expect(component.onlyDecimalNumberKey({ which: 79 })).toBeFalsy();
        expect(component.onlyDecimalNumberKey({ keyCode: 109 })).toBeFalsy();
    });

    it('should return true when is a decimal number', () => {
        expect(component.onlyDecimalNumberKey({ which: 49 })).toBeTruthy();
        expect(component.onlyDecimalNumberKey({ which: 52 })).toBeTruthy();
        expect(component.onlyDecimalNumberKey({ keyCode: 51 })).toBeTruthy();
        expect(component.onlyDecimalNumberKey({ keyCode: 57 })).toBeTruthy();
        expect(component.onlyDecimalNumberKey({ which: 48 })).toBeTruthy();
        expect(component.onlyDecimalNumberKey({ which: 56 })).toBeTruthy();
    });

    it('should not save plan type if form is invalid', () => {
        spyOn(component.savePlanType, 'emit');
        const modalData = {
            name: 'editPlanType',
            data: {
                planType: '',
                subscriptionPrice: '',
                planName: '',
                planDescriptions: ''
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.clickSavePlanType();
        expect(component.formGroup.invalid).toBeTruthy();
        expect(component.savePlanType.emit).toHaveBeenCalledTimes(0);
    });

    it('should save plan type if form is valid', () => {
        spyOn(component.savePlanType, 'emit');
        const modalData = {
            name: 'editPlanType',
            data: {
                planType: '',
                subscriptionPrice: '',
                planName: '',
                planDescriptions: ''
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.f.planType.setValue('mock type');
        component.f.subscriptionPrice.setValue('0');
        component.f.planName.setValue('mock name');
        component.f.planDescriptions.setValue('mock description');

        component.clickSavePlanType();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.modalData['data']['planType']).toBe('mock type');
        expect(component.modalData['data']['subscriptionPrice']).toBe('0');
        expect(component.modalData['data']['planName']).toBe('mock name');
        expect(component.modalData['data']['planDescriptions']).toBe('mock description');
        expect(component.savePlanType.emit).toHaveBeenCalled();
    });

    it('should not save group if form is invalid', () => {
        spyOn(component.saveGroup, 'emit');
        const modalData = {
            name: 'editGroup',
            data: {
                group: ''
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.clickSaveGroup();
        expect(component.formGroup.invalid).toBeTruthy();
        expect(component.saveGroup.emit).toHaveBeenCalledTimes(0);
    });

    it('should save group if form is valid', () => {
        spyOn(component.saveGroup, 'emit');
        const modalData = {
            name: 'editGroup',
            data: {
                group: ''
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.f.group.setValue('mock value');

        component.clickSaveGroup();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.modalData['data']['group']).toBe('mock value');
        expect(component.saveGroup.emit).toHaveBeenCalled();
    });

    it('should not save endpoint if form is invalid', () => {
        spyOn(component.saveEndpoint, 'emit');
        const modalData = {
            name: 'editEndpoint',
            data: {
                endpoint: '',
                method: '',
                description: '',
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.clickSaveEndpoint();
        expect(component.formGroup.invalid).toBeTruthy();
        expect(component.saveEndpoint.emit).toHaveBeenCalledTimes(0);
    });

    it('should save endpoint if form is valid', () => {
        spyOn(component.saveEndpoint, 'emit');
        const modalData = {
            name: 'editEndpoint',
            data: {
                endpoint: '',
                method: '',
                description: '',
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.f.endpoint.setValue('mock endpoint');
        component.f.method.setValue('mock method');
        component.f.description.setValue('mock description');

        component.clickSaveEndpoint();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.modalData['data']['endpoint']).toBe('mock endpoint');
        expect(component.modalData['data']['method']).toBe('mock method');
        expect(component.modalData['data']['description']).toBe('mock description');
        expect(component.saveEndpoint.emit).toHaveBeenCalled();
    });

    it('should not save secret if form is invalid', () => {
        spyOn(component.saveSecretHeaderOrParameter, 'emit');
        const modalData = {
            name: 'editSecretHeaderOrParameter',
            data: {
                key: '',
                value: '',
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.clickSaveSecretHeaderOrParameter();
        expect(component.formGroup.invalid).toBeTruthy();
        expect(component.saveSecretHeaderOrParameter.emit).toHaveBeenCalledTimes(0);
    });

    it('should save secred if form is valid', () => {
        spyOn(component.saveSecretHeaderOrParameter, 'emit');
        const modalData = {
            name: 'editSecretHeaderOrParameter',
            data: {
                key: '',
                value: ''
            }
        };
        component.modalData = modalData;
        fixture.detectChanges();

        component.f.key.setValue('mock key');
        component.f.value.setValue('mock value');

        component.clickSaveSecretHeaderOrParameter();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.modalData['data']['key']).toBe('mock key');
        expect(component.modalData['data']['value']).toBe('mock value');
        expect(component.saveSecretHeaderOrParameter.emit).toHaveBeenCalled();
    });
});
