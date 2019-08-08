import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageApiBannerComponent } from './manage-api-banner.component';


describe('ManageApiBannerComponent', () => {
    let component: ManageApiBannerComponent;
    let fixture: ComponentFixture<ManageApiBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageApiBannerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageApiBannerComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit changeTab event', () => {
        spyOn(component.changeTab, 'emit');
        component.clickTab('Test');

        expect(component.changeTab.emit).toHaveBeenCalled();
        expect(component.changeTab.emit).toHaveBeenCalledWith('Test');
    });
});
