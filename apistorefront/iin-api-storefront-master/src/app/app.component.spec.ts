import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let location: Location;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [Location]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        location = TestBed.get(Location);
        router = TestBed.get(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should do nothing when route is not changed', fakeAsync(() => {
        spyOn(window, 'scrollTo');
        fixture.detectChanges();
        tick();
        expect(window.scrollTo).toHaveBeenCalledTimes(0);
    }));

    it('should scroll to top when route is changed', fakeAsync(() => {
        spyOn(window, 'scrollTo');
        router.navigate(['']);
        fixture.detectChanges();
        tick();
        expect(location.path()).toBe('');
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    }));
});
