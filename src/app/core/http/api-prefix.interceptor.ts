import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = environment.serverUrl + request.url;
    // if (!environment.production){
    //   url += '?XDEBUG_SESSION_START=PHPSTORM';
    // }
    console.log(url);
    request = request.clone({url: url});
    return next.handle(request);
  }

}
