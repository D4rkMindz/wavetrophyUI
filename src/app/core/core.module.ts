import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '../material.module';
import {ShellComponent} from './shell/shell.component';
import {HeaderComponent} from './shell/header/header.component';
import {RouteReusableStrategy} from './route-reusable-strategy';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {I18nService} from './i18n.service';
import {HttpService} from './http/http.service';
import {HttpCacheService} from './http/http-cache.service';
import {ApiPrefixInterceptor} from './http/api-prefix.interceptor';
import {ErrorHandlerInterceptor} from './http/error-handler.interceptor';
import {CacheInterceptor} from './http/cache.interceptor';
import {JwtInterceptor} from './http/jwt.interceptor';
import {SnackbarService} from './snackbar.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    ShellComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    SnackbarService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    JwtInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
