import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddManageApiAddEndpointsComponent } from './add-manage-api-add-endpoints.component';


describe('AddManageApiAddEndpointsComponent', () => {
    let component: AddManageApiAddEndpointsComponent;
    let fixture: ComponentFixture<AddManageApiAddEndpointsComponent>;
    const dataList = {
        groupsList: [],
        endpointsList: []
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddManageApiAddEndpointsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddManageApiAddEndpointsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit clickNext if next', () => {
        spyOn(component.clickNext, 'emit');
        fixture.detectChanges();

        component.next();
        expect(component.clickNext.emit).toHaveBeenCalled();
    });

    it('should emit clickPrevious if previous', () => {
        spyOn(component.clickPrevious, 'emit');
        fixture.detectChanges();

        component.previous();
        expect(component.clickPrevious.emit).toHaveBeenCalled();
    });

    it('should add modalData group when clickAddGroup', () => {
        const emptydata = {
            group: '',
        };

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.clickAddGroup();
        expect(component.modalData.name).toBe('addGroup');
        expect(component.modalData.data).toBeDefined();
        expect(component.modalData.data).toEqual(emptydata);
    });

    it('should add modalData endpoint when clickAddEndpoint', () => {
        const emptyEndpoint = {
            endpoint: '',
            group: '',
            method: '',
            description: ''
        };

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.clickAddEndpoint();
        expect(component.modalData.name).toBe('addEndpoint');
        expect(component.modalData.data).toBeDefined();
        expect(component.modalData.data).toEqual(emptyEndpoint);
    });

    it('should edit group item when editGroupItem', () => {
        dataList['groupsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.editGroupItem(1);
        expect(component.modalData.name).toBe('editGroup');
        expect(component.modalData.data).toBe('item 2');
    });

    it('should edit endpoint item when editEndpointItem', () => {
        dataList['endpointsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.editEndpointItem(2);
        expect(component.modalData.name).toBe('editEndpoint');
        expect(component.modalData.data).toBe('item 3');
    });

    it('should save group item to dataList', () => {

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        const data = {
            group: ['Item 1', 'Item 2', 'Item 3'],
        };
        component.modalData.name = 'addGroup';
        component.modalData.data = data;
        component.dataListDropdown = {
            groupDropdown: []
        } as any;
        component.saveGroup(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.groupsList.length).toBe(1);
        expect(component.dataList.groupsList[0]).toEqual(data);
    });

    it('should not update group in dataList when edit', () => {
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.modalData.name = 'editGroup';
        component.modalData.data = ['Item 1', 'Item 2'];

        component.saveGroup(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.groupsList.length).toBe(0);
        expect(component.dataList.groupsList).toEqual([]);
    });

    it('should save endpoint to dataList', () => {

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.modalData.name = 'addEndpoint';
        component.modalData.data = ['Item 1', 'Item 2'];

        component.saveEndpoint(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.endpointsList.length).toBe(1);
        expect(component.dataList.endpointsList[0]).toEqual(['Item 1', 'Item 2']);
    });

    it('should not update endpoint in dataList when edit', () => {
        fixture.detectChanges();

        expect(component.modalData.name).toBe('');
        expect(component.modalData.data).toBeNull();

        component.modalData.name = 'editEndpoint';
        component.modalData.data = ['Item 1', 'Item 2'];

        component.saveEndpoint(0);
        expect(component.modalData.name).toBe('');
        expect(component.dataList.endpointsList.length).toBe(0);
        expect(component.dataList.endpointsList).toEqual([]);
    });

    it('should not delete group item from dataList when index is valid', () => {
        dataList['groupsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteGroupItem(5);
        expect(component.dataList.groupsList.length).toBe(3);
        expect(component.dataList.groupsList[0]).toBe('item 1');
        expect(component.dataList.groupsList[1]).toBe('item 2');
        expect(component.dataList.groupsList[2]).toBe('item 3');
    });

    it('should delete group item from dataList when index is valid', () => {
        dataList['groupsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteGroupItem(1);
        expect(component.dataList.groupsList.length).toBe(2);
        expect(component.dataList.groupsList[0]).toBe('item 1');
        expect(component.dataList.groupsList[1]).toBe('item 3');
    });

    it('should not delete endpoint item from dataList when index is valid', () => {
        dataList['endpointsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteEndpointItem(5);
        expect(component.dataList.endpointsList.length).toBe(3);
        expect(component.dataList.endpointsList[0]).toBe('item 1');
        expect(component.dataList.endpointsList[1]).toBe('item 2');
        expect(component.dataList.endpointsList[2]).toBe('item 3');
    });

    it('should delete endpoint item from dataList when index is valid', () => {
        dataList['endpointsList'] = ['item 1', 'item 2', 'item 3'];
        component.dataList = dataList;
        fixture.detectChanges();

        component.deleteEndpointItem(1);
        expect(component.dataList.endpointsList.length).toBe(2);
        expect(component.dataList.endpointsList[0]).toBe('item 1');
        expect(component.dataList.endpointsList[1]).toBe('item 3');
    });
});
