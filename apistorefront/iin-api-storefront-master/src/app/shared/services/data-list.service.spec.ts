import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.prod';
import { DataListService } from './data-list.service';


describe('DataListService', () => {

  let service: DataListService;
  let httpMock: HttpTestingController;
  let cookie: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataListService,
        CookieService]
    });
    service = TestBed.get(DataListService);
    httpMock = TestBed.get(HttpTestingController);
    cookie = TestBed.get(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<string[]> when calling get', () => {
    const dummyAddress = 'dummyUrl';
    const dummyData = [
      'test 1',
      'test 2',
      'test 3'
    ];

    service.get(dummyAddress).subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(dummyData);
    });

    const mockRequest = httpMock.expectOne(`${environment.apiBase}dummyUrl`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(dummyData);
  });

  it('should put correct credentials when login', () => {

    const dummyCredentials = {
      email: 'email@test.com',
      password: 'pass'
    };

    const mockResponse = { token: 'asd', role: 'test' };

    const cookieSpy = spyOn(cookie, 'set');

    service.login(dummyCredentials.email, dummyCredentials.password)
      .subscribe(_ => {
        expect(cookie.set).toHaveBeenCalledTimes(2);
        expect(cookieSpy.calls.argsFor(0)).toEqual(['token', mockResponse.token, null, '/']);
        expect(cookieSpy.calls.argsFor(1)).toEqual(['role', mockResponse.role, null, '/']);
      });


    const mockRequest = httpMock.expectOne(
      `${environment.securityBase}/login`
    );
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(mockResponse);
  });

  it('should delete all cookies when logout', () => {
    spyOn(cookie, 'deleteAll');

    service.logout().subscribe((data) => {
      expect(cookie.deleteAll).toHaveBeenCalled();
    });

    const mockRequest = httpMock.expectOne(
      `${environment.securityBase}/logout`
    );

    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(null);
  });

  it('should check login', () => {
    const testCookie = [{ token: 'test Token' }];
    spyOn(cookie, 'get').and.returnValue(JSON.stringify(testCookie));

    service.check().subscribe((data) => {
      expect(data).toBe(testCookie);
    });

    const mockRequest = httpMock.expectOne(
      `${environment.securityBase}/check`
    );

    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(testCookie);
  });

});

