import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBannerComponent } from './dashboard-banner.component';


describe('DashboardBannerComponent', () => {
    let component: DashboardBannerComponent;
    let fixture: ComponentFixture<DashboardBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardBannerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardBannerComponent);
        component = fixture.componentInstance;
        component.dataList = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit changeTab event when clicking tab link', () => {
        spyOn(component.changeTab, 'emit');
        component.clickTab('Test');

        expect(component.changeTab.emit).toHaveBeenCalled();
        expect(component.changeTab.emit).toHaveBeenCalledWith('Test');
    });
});
