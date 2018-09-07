import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {environment} from '@env/environment';
import {Logger} from '../logger.service';
import {AuthenticationService, Credentials} from '@app/core';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  private auth: AuthenticationService;
  private http: HttpClient;

  constructor(inj: Injector) {
    setTimeout(() => {
      this.auth = inj.get(AuthenticationService);
      this.http = inj.get(HttpClient);
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        return this.handleError(error, request, next);
      }),
    );
  }

  private handleError(response: HttpEvent<any>, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    log.debug(response);
    if (response instanceof HttpErrorResponse && (response.status === 401 || response.status === 0)) {
      log.debug('Refreshing token');
      return this.auth.login(this.auth.credentials)
        .subscribe((credentials: Credentials) => {

          const headers = request.headers.append('X-Token', credentials.token);
          request = request.clone({headers: headers});
          console.log(request);
          return next.handle(request);
        });
      // .pipe(
      //   map((credentials: Credentials) => {
      //
      //   })
      // );
      // pipe(
      //   switchMap(() => {
      //     console.log(this.auth.credentials);
      //     return this.auth.login(this.auth.credentials);
      //   }),
      //   map((credentials: Credentials) => {
      //   })
      // );
      // return this.auth.login(this.auth.credentials).switchMap((credentials: Credentials) => {
      //   log.debug('Token refreshed');
      //   const headers = request.headers.append('X-Token', credentials.token);
      //   request = request.clone({headers: headers});
      //   this.http.request(request.method, request.url, {
      //     body: request.body,
      //     headers: request.headers,
      //     responseType: request.responseType,
      //     withCredentials: request.withCredentials,
      //     params: request.params,
      //     reportProgress: request.reportProgress,
      //   });
      // });
    }
    if (!environment.production) {
      // Do something with the error
      // log.error('Request error', response);
    }
    throw response;
  }

}
