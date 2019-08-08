import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * This class provides the DataListService service
 */
@Injectable()
export class DataListService {
  httpPostOptions = {
    headers:
      new HttpHeaders ({
        'Content-Type': 'application/json'
      }),
    withCredentials: true,
  };

  isLoggedIn = false;

  private baseUrl = environment.securityBase;

  private apiUrl = environment.apiBase;  // URL to web api

  /**
   * Creates a new DataListService with the injected HttpClient.
   */
  constructor(private cookieService: CookieService, protected httpClient: HttpClient) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   */
  get(urlAddress: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl + urlAddress);
  }

  /**
   * Login.
   */
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/login', { email, password }, this.httpPostOptions).pipe(
      tap(({ token, role }) => {
        this.cookieService.set('token', token, null, '/');
        this.cookieService.set('role', role, null, '/');
      })
    );
  }

  /**
   * Logout.
   */
  logout(): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/logout', null, this.httpPostOptions).pipe(
      tap(() => {
        this.cookieService.deleteAll('/');
      })
    );
  }

  /**
   * Check login.
   */
  check(): Observable<any> {
    const token = this.cookieService.get('token');
    return this.httpClient.post<any>(this.baseUrl + '/check', { token }, this.httpPostOptions);
  }

}
