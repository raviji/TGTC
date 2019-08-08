import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoreAPIComponent } from './list-more-api.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListMoreAPIComponent', () => {
    let component: ListMoreAPIComponent;
    let fixture: ComponentFixture<ListMoreAPIComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ListMoreAPIComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListMoreAPIComponent);
        component = fixture.componentInstance;

        component.dataList = [
            {
                pageId: '0',
                iconName: 'icon-risk.svg',
                title: 'Risk Scoring',
                description: 'Risk Scoring is a service product ...',
                tagList: [
                    {
                        name: 'Banking'
                    },
                    {
                        name: 'Blockchain'
                    }
                ],
                pricing: 'Paid',
                Popular: 100,
                Downloaded: 50,
                'High Rating': 1
            },
            {
                pageId: '1',
                iconName: 'icon-query.svg',
                title: 'Big Query Image API',
                description: 'Send targeted notifications to ...',
                tagList: [
                    {
                        name: 'Finance'
                    }
                ],
                pricing: 'Free',
                Popular: 80,
                Downloaded: 40,
                'High Rating': 4
            }
        ];

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call updateFilter on changes', () => {
        spyOn(component, 'updateFilter');
        fixture.detectChanges();

        component.ngOnChanges();
        expect(component.updateFilter).toHaveBeenCalled();
    });

    it('should update filterData and call updateFilter when changing all category', () => {
        spyOn(component, 'updateFilter').and.stub();

        // categoryAll is false
        component.filterData['categoryAll'] = false;
        component.filterData['category'].forEach((item, index) => {
            item['checked'] = true;
        });
        component.changeAllCategory();

        expect(component.filterData['categoryAll']).toBeFalsy();
        component.filterData['category'].forEach((item, index) => {
            expect(item['checked']).toBeTruthy();
        });
        expect(component.updateFilter).toHaveBeenCalled();


        // categoryAll is true
        component.filterData['categoryAll'] = true;
        component.changeAllCategory();

        expect(component.filterData['categoryAll']).toBeTruthy();
        component.filterData['category'].forEach((item, index) => {
            expect(item['checked']).toBeFalsy();
        });
        expect(component.updateFilter).toHaveBeenCalled();
    });

    it('should update filterData and call updateFilter when changing subCategory', () => {
        spyOn(component, 'updateFilter').and.stub();

        // no category items are checked
        component.changeSubCategory();

        expect(component.filterData['categoryAll']).toBeTruthy();
        component.filterData['category'].forEach((item, index) => {
            expect(item['checked']).toBeFalsy();
        });
        expect(component.updateFilter).toHaveBeenCalled();


        // some/all category items are checked
        component.filterData['category'].forEach((item, index) => {
            item['checked'] = true;
        });
        component.changeSubCategory();

        expect(component.filterData['categoryAll']).toBeFalsy();
        expect(component.updateFilter).toHaveBeenCalled();
    });

    it('should update filterData and call updateFilter when changing all pricing', () => {
        spyOn(component, 'updateFilter').and.stub();

        // pricingAll is false
        component.filterData['pricingAll'] = false;
        component.filterData['pricing'].forEach((item, index) => {
            item['checked'] = true;
        });
        component.changeAllPricing();

        expect(component.filterData['pricingAll']).toBeFalsy();
        component.filterData['pricing'].forEach((item, index) => {
            expect(item['checked']).toBeTruthy();
        });
        expect(component.updateFilter).toHaveBeenCalled();


        // pricingAll is true
        component.filterData['pricingAll'] = true;
        component.changeAllPricing();

        expect(component.filterData['pricingAll']).toBeTruthy();
        component.filterData['pricing'].forEach((item, index) => {
            expect(item['checked']).toBeFalsy();
        });
        expect(component.updateFilter).toHaveBeenCalled();
    });

    it('should update filterData and call updateFilter when changing subPricing', () => {
        spyOn(component, 'updateFilter').and.stub();

        // no pricing items are checked
        component.changeSubPricing();

        expect(component.filterData['pricingAll']).toBeTruthy();
        component.filterData['pricing'].forEach((item, index) => {
            expect(item['checked']).toBeFalsy();
        });
        expect(component.updateFilter).toHaveBeenCalled();


        // some/all pricing items are checked
        component.filterData['pricing'].forEach((item, index) => {
            item['checked'] = true;
        });
        component.changeSubPricing();

        expect(component.filterData['pricingAll']).toBeFalsy();
        expect(component.updateFilter).toHaveBeenCalled();
    });

    it('should update filterData and call updateFilter when changing sort', () => {
        spyOn(component, 'updateFilter').and.stub();
        const index = 1;

        // no sort was selected
        component.changeSort(index);

        component.filterData['sort'].forEach((sortItem, sortIndex) => {
            expect(sortItem['checked']).toBeFalsy();
        });
        expect(component.updateFilter).toHaveBeenCalled();


        // sort was selected
        component.filterData['sort'][index]['checked'] = true;
        component.changeSort(index);

        expect(component.filterData['sort'][index]['checked']).toBeTruthy();
        component.filterData['sort'].forEach((sortItem, sortIndex) => {
            if (index !== sortIndex) {
                expect(sortItem['checked']).toBeFalsy();
            }
        });
        expect(component.updateFilter).toHaveBeenCalled();
    });


    it('should update shown data based on selected filterData', () => {
        // no filter data is applicable
        component.filterData['categoryAll'] = false;
        component.filterData['pricingAll'] = false;

        component.updateFilter();
        expect(component.dataListShown).toEqual([]);


        // categoryAll is true
        component.filterData['categoryAll'] = true;

        component.updateFilter();
        expect(component.dataListShown).toEqual([]);


        // pricingAll is true
        component.filterData['categoryAll'] = false;
        component.filterData['pricingAll'] = true;

        component.updateFilter();
        expect(component.dataListShown).toEqual([]);


        // categoryAll and pricingAll are true
        component.filterData['categoryAll'] = true;
        component.filterData['pricingAll'] = true;

        component.updateFilter();
        expect(component.dataListShown).toEqual(component.dataList);


        // sort data by rating
        component.filterData['sort'][2].checked = true;

        component.updateFilter();
        expect(component.dataListShown).toEqual([component.dataList[1], component.dataList[0]]);


        // filter data by search text
        component.searchText = 'Big';

        component.updateFilter();
        expect(component.dataListShown).toEqual([component.dataList[1]]);


        // category Banking and princing Paid are true
        component.filterData['categoryAll'] = false;
        component.filterData['category'][0].checked = true;
        component.filterData['pricingAll'] = false;
        component.filterData['pricing'][0].checked = true;
        component.searchText = '';

        component.updateFilter();
        expect(component.dataListShown).toEqual([component.dataList[0]]);
    });
});
