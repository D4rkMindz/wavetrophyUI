import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';

import {environment} from '@env/environment';
import * as moment from 'moment';
import {Logger} from '../logger.service';
import {AuthenticationService, Credentials} from '../authentication/authentication.service';
import {map, switchMap} from 'rxjs/operators';
import {SnackbarService} from '../snackbar.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private auth: AuthenticationService;
  private isRefreshing = false;
  private logger: Logger = new Logger('JWT INTERCEPTOR');


  constructor(private inj: Injector) {
    setTimeout(() => {
      this.auth = inj.get(AuthenticationService);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = environment.keys.credentials;
    const credentials = JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key));

    // No credentials available
    if (!credentials) {
      return next.handle(request);
    }

    const expired = moment.unix(credentials.expiresAt).subtract(2, 'm');
    const isExpired = moment().isAfter(expired);

    // Refresh token if expired
    if (isExpired && !this.isRefreshing) {
      this.isRefreshing = true;
      this.logger.debug('Token expired');
      const auth = this.inj.get(AuthenticationService);
      return auth.login(credentials)
        .pipe(
          switchMap((credentials: Credentials) => {
            this.logger.debug('Token:', credentials.token);
            return next.handle(this.addHeaders(request, credentials.token));
          }),
        );
    }

    // Token valid
    if (credentials.token && !isExpired) {
      return next.handle(this.addHeaders(request, credentials.token));
    }

    // No token available
    return next.handle(request);
  }

  private addHeaders(request: HttpRequest<any>, token: string) {
    const headers = request.headers.append('X-Token', token);
    return request.clone({headers: headers});
  }

}
