import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { AddManageApiAddBaseUrlComponent } from './add-manage-api-add-base-url.component';


describe('AddManageApiAddBaseUrlComponent', () => {
    let component: AddManageApiAddBaseUrlComponent;
    let fixture: ComponentFixture<AddManageApiAddBaseUrlComponent>;
    const dataList = {
        baseURL: '',
        baseURLFirewallSettings: '',
        authentication: '',
        secretHeaderOrParameterList: [],
        apiVisibility: false
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [AddManageApiAddBaseUrlComponent],
            providers: [ValidationService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddManageApiAddBaseUrlComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form with dataList entries', () => {
        dataList['baseURL'] = 'www.mock.com';
        dataList['baseURLFirewallSettings'] = 'mock';
        component.dataList = dataList;
        fixture.detectChanges();

        expect(component.f.baseURL.value).toBe(dataList.baseURL);
        expect(component.f.baseURLFirewallSettings.value).toBe(dataList.baseURLFirewallSettings);
    });

    it('should not emit clickNext if authentication not valid', () => {
        dataList['baseURL'] = 'www.mock.com';
        dataList['baseURLFirewallSettings'] = 'mock';
        component.dataList = dataList;
        spyOn(component.clickNext, 'emit');
        fixture.detectChanges();

        component.next();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.dataList.authentication).toBe('');
        expect(component.clickNext.emit).toHaveBeenCalledTimes(0);
    });

    it('should emit clickNext if dataList is valid', () => {
        dataList['baseURL'] = 'www.mock.com';
        dataList['baseURLFirewallSettings'] = 'mock';
        dataList['authentication'] = 'mock';
        component.dataList = dataList;
        spyOn(component.clickNext, 'emit');
        fixture.detectChanges();

        component.next();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.dataList.authentication).toBe('mock');
        expect(component.clickNext.emit).toHaveBeenCalled();
    });

    it('should emit clickPrevious when click previous', () => {
        spyOn(component.clickPrevious, 'emit');
        fixture.detectChanges();

        component.previous();
        expect(component.clickPrevious.emit).toHaveBeenCalled();
    });

    it('should mark saved when click save', () => {
        component.clickSave();
        expect(component.saved).toBeTruthy();
    });

    it('should update modalData when clickAddSecretHeaderOrParameter', () => {
        component.clickAddSecretHeaderOrParameter();
        expect(component.modalData.name).toBe('addSecretHeaderOrParameter');
        expect(component.modalData.data).toBeDefined();
        expect(component.modalData.data).toEqual({ key: '', value: '' });
    });

    it('should edit modalData when editSecretHeaderOrParameterItem', () => {
        dataList['secretHeaderOrParameterList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.editSecretHeaderOrParameterItem(0);
        expect(component.modalData.name).toBe('editSecretHeaderOrParameter');
        expect(component.modalData.data).toBe('item 1');
    });

    it('should append secretHeaderOrParameterList to dataList', () => {

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.modalData.name = 'addSecretHeaderOrParameter';
        component.modalData.data = ['Item 1', 'Item 2'];

        component.saveSecretHeaderOrParameter(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.secretHeaderOrParameterList.length).toBe(1);
        expect(component.dataList.secretHeaderOrParameterList[0]).toEqual(['Item 1', 'Item 2']);
    });

    it('should not update secretHeaderOrParameterList in dataList when edit', () => {
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.modalData.name = 'editSecretHeaderOrParameter';
        component.modalData.data = ['Item 1', 'Item 2'];

        component.saveSecretHeaderOrParameter(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.secretHeaderOrParameterList.length).toBe(0);
        expect(component.dataList.secretHeaderOrParameterList).toEqual([]);
    });

    it('should not delete secret from dataList when index is invalid', () => {
        dataList['secretHeaderOrParameterList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteSecretHeaderOrParameterItem(5);
        expect(component.dataList.secretHeaderOrParameterList.length).toBe(3);
        expect(component.dataList.secretHeaderOrParameterList[0]).toEqual('item 1');
        expect(component.dataList.secretHeaderOrParameterList[1]).toEqual('item 2');
        expect(component.dataList.secretHeaderOrParameterList[2]).toEqual('item 3');
    });

    it('should delete secret from dataList when index is valid', () => {
        dataList['secretHeaderOrParameterList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteSecretHeaderOrParameterItem(1);
        expect(component.dataList.secretHeaderOrParameterList.length).toBe(2);
        expect(component.dataList.secretHeaderOrParameterList[0]).toBe('item 1');
        expect(component.dataList.secretHeaderOrParameterList[1]).toBe('item 3');
    });

    it('should emit clickDeleteApi when deleteApi', () => {
        spyOn(component.clickDeleteAPI, 'emit');

        component.deleteAPI();
        expect(component.clickDeleteAPI.emit).toHaveBeenCalled();
    });
});
