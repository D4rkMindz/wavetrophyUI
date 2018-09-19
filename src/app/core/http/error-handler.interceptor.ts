import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe, throwError} from 'rxjs';
import {catchError, filter, finalize, map, switchMap, take} from 'rxjs/operators';

import {environment} from '@env/environment';
import {Logger} from '../logger.service';
import {AuthenticationService, Credentials} from '../authentication/authentication.service';
import {SnackbarService} from '../snackbar.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  private auth: AuthenticationService;
  private http: HttpClient;
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private logger: Logger = new Logger('ERROR HANDLER INTERCEPTOR');

  constructor(inj: Injector, private snackbar: SnackbarService) {
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
    this.logger.debug(response);
    if (response instanceof HttpErrorResponse && (response.status === 401 || response.status === 0)) {
      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;
        this.tokenSubject.next(null);
        this.logger.debug('Refreshing token');
        return this.auth.login(this.auth.credentials)
          .pipe(
            switchMap((credentials: Credentials) => {
              this.logger.debug('Refreshed token', credentials);
              if (credentials.token) {
                this.tokenSubject.next(credentials.token);

                return next.handle(this.addHeader(request, credentials.token));
              }
              this.logout();
            }),
            catchError((err) => {
              this.logger.debug('catched error:', err);
              return this.logout();
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            })
          );
      } else {
        this.logger.debug('triggered pipe');
        return this.tokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            return next.handle(this.addHeader(request, token));
          })
        );
      }

    }
    if (!environment.production) {
      // Do something with the error
      // this.logger.error('Request error', response);
    }
    throw response;
  }

  private logout() {
    // TODO fix this fucking component
    this.snackbar.info('Fix this error u layze mofaka! Just click dat button again!');
    return throwError('Uncomment code below');
    // TODO uncomment code below
    // this.auth.logout();
    // return throwError(new Error('Logged user out'));
  }

  private addHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const headers = request.headers.append('X-Token', token);
    return request.clone({headers: headers});
  }

}
