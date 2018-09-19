import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';
import {Logger} from '../logger.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  private logger: Logger = new Logger('API PREFIX INTERCEPTOR');

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = environment.serverUrl + request.url;
    this.logger.debug(url);
    request = request.clone({url: url});
    return next.handle(request);
  }

}
