import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = environment.keys.credentials;
    const credentials = JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key));
    if (!credentials) {
      return next.handle(request);
    }
    if (credentials.token) {
      const headers = request.headers.append('X-Token', credentials.token);
      request = request.clone({headers: headers});
    }
    return next.handle(request);
  }

}
