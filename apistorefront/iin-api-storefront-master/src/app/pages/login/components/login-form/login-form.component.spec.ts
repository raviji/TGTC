import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of, throwError } from 'rxjs';
import { DataListService } from 'src/app/shared/services/data-list.service';
import { LoginFormComponent } from './login-form.component';


describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let router: Router;
    let dataListService: DataListService;
    let cookie: CookieService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            declarations: [
                LoginFormComponent
            ],
            providers: [
                DataListService,
                CookieService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.get(Router);
        dataListService = TestBed.get(DataListService);
        cookie = TestBed.get(CookieService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not proceed with login if form is invalid', () => {

        component.f.email.setValue('');
        component.f.password.setValue('');
        component.clickLogin();

        spyOn(router, 'navigate');
        spyOn(dataListService, 'login').and.returnValue(of({}));

        expect(dataListService.login).toHaveBeenCalledTimes(0);
        expect(router.navigate).toHaveBeenCalledTimes(0);
    });

    it('should store cookies when login is successful', () => {
        const cookieSpy = spyOn(cookie, 'set');

        spyOn(dataListService, 'login').and.returnValue(of({}));

        component.f.email.setValue('dummy@test.com');
        component.f.password.setValue('test');
        component.clickLogin();

        expect(cookie.set).toHaveBeenCalledTimes(2);
        expect(cookieSpy.calls.argsFor(0)).toEqual(['userName', 'Michele Zudith', null, '/']);
        expect(cookieSpy.calls.argsFor(1)).toEqual(['myAPIList', '[{"apiName":"CRYPTO SIGNAL","expanded":false}]']);
    });

    it('should navigate to dashboard when login successful for developer role', () => {
        spyOn(router, 'navigate');
        spyOn(dataListService, 'login').and.returnValue(of({}));
        spyOn(cookie, 'get').and.returnValues('', 'developer');

        component.f.email.setValue('dummy@test.com');
        component.f.password.setValue('test');
        component.clickLogin();

        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should navigate to dashboard when login successful for admin role', () => {
        spyOn(router, 'navigate');
        spyOn(dataListService, 'login').and.returnValue(of({}));
        spyOn(cookie, 'get').and.returnValues('', 'admin');

        component.f.email.setValue('dummy@test.com');
        component.f.password.setValue('test');
        component.clickLogin();

        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should navigate to survey when login successful for user role', () => {
        spyOn(router, 'navigate');
        spyOn(dataListService, 'login').and.returnValue(of({}));
        spyOn(cookie, 'get').and.returnValues('', 'user');

        component.f.email.setValue('dummy@test.com');
        component.f.password.setValue('test');
        component.clickLogin();

        expect(router.navigate).toHaveBeenCalledWith(['/survey']);
    });

    it('should log error message when login throws error', () => {
        const testError = { status: '404', error: 'Something went wrong' };

        spyOn(dataListService, 'login').and.returnValue(throwError(testError));
        spyOn(console, 'error');

        component.f.email.setValue('dummy@test.com');
        component.f.password.setValue('test');
        component.clickLogin();

        expect(console.error).toHaveBeenCalledWith('Error 404 - Something went wrong');
        expect(component.showError).toBeTruthy();
    });
});
