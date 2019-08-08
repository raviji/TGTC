import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubscribedApiComponent } from './dashboard-subscribed-api.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardSubscribedApiComponent', () => {
    let component: DashboardSubscribedApiComponent;
    let fixture: ComponentFixture<DashboardSubscribedApiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DashboardSubscribedApiComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSubscribedApiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
